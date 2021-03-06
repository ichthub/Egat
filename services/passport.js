const passport = require('passport');
const GoogleStartegy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');
passport.serializeUser((user, done) => {
  // the goal os serializeUser is to generate a unique id to store in cookies
  done(null, user.id); // put user.id in cookies
});
passport.deserializeUser((id, done) => {
  // the goal os deserializeUser is to translate the unique id which is stored in cookies to mongoose model
  User.findById(id).then(user => {
    done(null, user);
  });
});
// new instance of GoAuath and pass obj to tell it how to implement OAuth
passport.use(
  new GoogleStartegy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if the user is already in DB
      const existingUser = await User.findOne({ googleId: profile.id });
      // existingUser could be null or mongoose module instance =>(record = obj)
      if (!existingUser) {
        // record not found in DB
        // insert a record to DB and chain done to give feedback to passport about our state
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      } else {
        // done's method purpose is to give feedback to passport about our state
        done(null, existingUser); // means user is found
      }
    }
  )
);
