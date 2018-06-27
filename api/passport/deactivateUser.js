const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');
const bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
  const isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  };

  passport.use(
    'deactivateUser',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      },
      function(req, username, password, done) {
        findAndVerifyUser = function() {
          User.findOne({ username: username }, function(err, user) {
            if (err) return done(err);
            if (!user) {
              return done(null, false, { message: user + ' not found' });
            }
            if (!isValidPassword(user, password)) {
              return done(null, false, { message: 'Invalid Password' });
            }
            return done(null, user, {
              message: 'User is authorized to deactivate their account'
            });
          });
        };
        process.nextTick(findAndVerifyUser);
      }
    )
  );
};
