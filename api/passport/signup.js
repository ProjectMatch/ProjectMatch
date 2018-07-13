const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');
const bCrypt = require('bcrypt-nodejs');
const UserDetails = require('../models/UserDetails');

module.exports = function(passport) {
  const createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };

  passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      function(req, username, password, done) {
        findOrCreateUser = function() {
          User.findOne(
            { $or: [{ email: username }, { username: req.body.username }] },
            function(err, user) {
              if (err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
              }
              if (user) {
                console.log('User already exists with this email or username');
                return done(null, false, {
                  message: 'User already exists with this email or username'
                });
              } else {
                const newUser = new User();

                newUser.username = req.body.username;
                newUser.password = createHash(password);
                newUser.email = username;
                newUser.firstName = req.body.firstName;
                newUser.lastName = req.body.lastName;

                newUser.save(function(err, newUser) {
                  if (err) {
                    console.log('Error in Saving user: ' + err);
                    throw err;
                  }
                  console.log('User Registration succesful');
                  return done(null, newUser, {
                    message: 'User Registration Succesful'
                  });
                });
              }
            }
          );
        };
        process.nextTick(findOrCreateUser);
      }
    )
  );
};
