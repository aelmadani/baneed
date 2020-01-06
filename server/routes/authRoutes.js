const passport = require("passport");
const requireLogin = require("../middleware/requireLogin");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  // Route: auth/facebook
  // Desc: Facebook Authentication
  // Access: Public
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      //   res.send({ hej: "logged" });
      console.log(req.user);
      res.redirect("/api/dashboard");
    }
  );

  // Route: api/dashboard
  // Desc: Facebook Authentication
  // Access: Public
  app.get("/api/dashboard", requireLogin, (req, res) => {
    res.send(req.user);
    console.log(req.user);
  });

  // Route: /api/register
  // Desc: register local acount
  // Access: Public
  app.post("/api/register", (req, res) => {
    const { firstName, lastName, email, password, password2 } = req.body;
    let errors = [];
    console.log(req.body);

    //Check required fields
    if (!email || !firstName || !lastName || !password || !password2) {
      errors.push({ msg: "Please fill all fields" });
      console.log("Please fill all fields");
    }

    // Check password match
    if (password !== password2) {
      errors.push({ msg: "Passwords not matching" });
      console.log("Passwords not matching");
    }

    // Check password length
    if (password.length < 6) {
      errors.push({ msg: "Password should be at least 6 characters" });
      console.log("Password should be at least 6 characters");
    }

    if (errors.length > 0) {
      // Show error
    } else {
      //Validartion pass
      User.findOne({ email: email }).then((user) => {
        if (user) {
          // error exists
          errors.push({ msg: "email already registered" });
        } else {
          const newUser = new User({
            firstName,
            lastName,
            email,
            password
          });

          // Hash password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) console.log(err);

              newUser.password = hash;
              console.log(newUser);
              // Save user
              newUser
                .save()
                .then((user) => {
                  //res.redirect("/login");
                  res.send(newUser);
                })
                .catch((err) => console.log(err));
            })
          );
        }
      });
    }
  });

  // Route: /auth/login
  // Desc: login to local acount
  // Access: Public
  app.post("/auth/login", (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/api/dashboard",
      failureRedirect: "/auth/login"
    })(req, res, next);
  });

  // Route: /auth/logout
  // Desc: Logout
  // Access: Public
  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/auth/login");
  });
};
