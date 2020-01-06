const express = require("express");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const profileRoutes = require("./routes/profileRoutes");

const keys = require("./config/keys");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

require("./models/User");

require("./services/passport-facebook");
require("./services/passport-local")(passport);

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
carRoutes(app);
profileRoutes(app);

const PORT = process.env.PORT || 5060;
app.listen(PORT);
