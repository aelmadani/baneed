const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const profileRoutes = require("./routes/profileRoutes");

const flash = require("connect-flash");

require("./models/User");

require("./services/passport-facebook");

// require("./services/passport-local")(passport);

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// const storage = multer.diskStorage({
//   destination: "../../client/public/uploads/",
//   filename: function(req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   }
// });

// // init upload
// const upload = multer({
//   storage: storage,
//   limits: { fieldSize: 1000000 }
// }).single("carImage");

const app = express();
// app.use(express.json());
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(express.static("../../client/public"));

app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());
// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

authRoutes(app);
carRoutes(app);
profileRoutes(app);

const PORT = process.env.PORT || 5060;
app.listen(PORT);
