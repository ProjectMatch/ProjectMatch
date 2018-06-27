const login = require('./login');
const signup = require('./signup');
const deactivateUser = require('./deactivateUser');
const deleteUser = require('./deleteUser');
const project = require('../routes/project.js');
const User = require('../models/Users');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  signup(passport);
  login(passport);
  deactivateUser(passport);
  deleteUser(passport);
  project(passport);
  //TODO: Reset Password and Change Password
};
