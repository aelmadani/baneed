const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");
const config = require("config");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: config.get("facebookClientID"),
      clientSecret: config.get("facebookClientSecret"),
      callbackURL: config.get("facebookCallbackUrl"),
      profileFields: ["emails", "name"]
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingFacebookUser = await User.findOne({
        facebookId: profile.id
      });

      if (existingFacebookUser) {
        return done(null, existingFacebookUser);
      }

      const user = await new User({
        facebookId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value
      }).save();
      done(null, user);

      // // First checkin if Facebook email is registered
      // const existingEmailUser = await User.findOne({
      //   email: profile.emails[0].value
      // });
      // console.log(accessToken);

      // if (existingEmailUser) {
      //   // If User already registered with email
      //   console.log("user email found");
      //   if (existingEmailUser.facebookId) {
      //     // If the User already has added facebook to account
      //     return done(null, existingEmailUser);
      //   } else {
      //     // Adding Facebook to account
      //     const user = await User.findOneAndUpdate(
      //       { email: profile.emails[0].value },
      //       { $set: { facebookId: profile.id } },
      //       { new: true }
      //     );
      //     return done(null, user);
      //   }
      // }
      // // If user not found
      // const user = await new User({
      //   facebookId: profile.id,
      //   firstName: profile.name.givenName,
      //   lastName: profile.name.familyName,
      //   email: profile.emails[0].value
      // }).save();

      // done(null, user);
    }
  )
);
