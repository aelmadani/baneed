const passport = require("passport");

//const requireLogin = require("../middleware/requireLogin");
const User = require("../models/User");
const config = require("config");

// const { ensureAuthenticated } = require("../config/auth");

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
      res.redirect(config.get("redirectDomain"));
    }
  );

  app.get("/api/user", (req, res) => {
    res.send(req.user);
  });

  // Route: /auth/logout
  // Desc: Logout
  // Access: Public
  app.get("/api/logout", (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/");
  });

  // // Route: api/dashboard
  // // Desc: Facebook Authentication
  // // Access: Public
  // app.get("/api/dashboard", ensureAuthenticated, (req, res) => {
  //   res.send(req.user);
  //   console.log(req.user);
  // });

  // // Route: /api/register
  // // Desc: register local acount
  // // Access: Public
  // app.post("/api/register", (req, res) => {
  //   const { firstName, lastName, email, password } = req.body;
  //   let errors = [];
  //   console.log(req.body);

  //   //Check required fields
  //   if (!email || !firstName || !lastName || !password) {
  //     errors.push({ msg: "Please fill all fields" });
  //     console.log("Please fill all fields");
  //   }

  //   // Check password length
  //   if (password.length < 6) {
  //     errors.push({ msg: "Password should be at least 6 characters" });
  //     console.log("Password should be at least 6 characters");
  //   }

  //   if (errors.length > 0) {
  //     // Show error
  //   } else {
  //     //Validartion pass
  //     User.findOne({ email: email }).then((user) => {
  //       if (user) {
  //         // error exists
  //         errors.push({ msg: "email already registered" });
  //       } else {
  //         const newUser = new User({
  //           firstName,
  //           lastName,
  //           email,
  //           password
  //         });

  //         // Hash password
  //         bcrypt.genSalt(10, (err, salt) =>
  //           bcrypt.hash(newUser.password, salt, (err, hash) => {
  //             if (err) console.log(err);

  //             newUser.password = hash;
  //             console.log(newUser);
  //             // Save user
  //             newUser
  //               .save()
  //               .then((user) => {
  //                 req.flash(
  //                   "success_msg",
  //                   "You are now registered and can log in"
  //                 );
  //                 //res.redirect("/login");
  //                 res.send(newUser);
  //                 //res.redirect("/auth/login");
  //               })
  //               .catch((err) => console.log(err));
  //           })
  //         );
  //       }
  //     });
  //   }
  // });

  // // @route   GET api/auth
  // // @desc    Test route
  // // @access  Public
  // app.get("/api/auth", ensureAuthenticated, async (req, res) => {
  //   try {
  //     //const user = await User.findById(req.user.id).select("-password");
  //     console.log(req.body.user);
  //     res.json(req.body.user);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send("Server Error");
  //   }
  // });

  // // Route: /api/login
  // // Desc: login to local acount
  // // Access: Public
  // app.post("/api/login", (req, res, next) => {
  //   passport.authenticate("local", {
  //     successRedirect: "/api/dashboard",
  //     failureRedirect: "/api/login",
  //     failureFlash: true
  //   })(req, res, next);
  // });
};
