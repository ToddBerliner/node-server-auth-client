const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

// Strategy = a method of authentication

const localOptions = { usernameField: 'email' };

// Set up options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create Local Strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify email and password
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err, false) }
    if (! user) { return done(null, false) }
    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err) }
      if (! isMatch) { return done(null, false) }
      return done(null, user);
    });
  });
});

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // payload = the { sub: user.id, iat: timestamp } object we did jwt.encode on
  // if user id exists, call done(user)
  // else call done()
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell Passport to user this strategy
passport.use(jwtLogin);
passport.use(localLogin);
