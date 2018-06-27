const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');
const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
  const isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  };

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      function(req, username, password, done) {
        loginUser = function() {
          User.findOne({ email: username }, function(err, user) {
            if (err) return done(err);
            if (!user) {
              return done(null, false, {
                message: 'User Not Found with Email'
              });
            }
            if (!isValidPassword(user, password)) {
              return done(null, false, { message: 'Invalid Password' });
            }
            return done(null, user, { message: 'Successfully logged in' });
          });
        };
        process.nextTick(loginUser);
      }
    )
  );
};
