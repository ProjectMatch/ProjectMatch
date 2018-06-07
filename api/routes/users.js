const express = require('express');
const router = express.Router();
const isAuthenticated = require('../utils/authentication');
const User = require('../models/Users');

module.exports = function(passport) {
  router.get('/:username/profile/picture', function(req, res) {
    User.findOne({ username: req.params.username }, function(err, user) {
      if (err) {
        res.status(404).send({
          error: 'Not Found'
        });
      } else {
        user.profileImage === ''
          ? res.json({ profileImage: 'http://via.placeholder.com/50x50' })
          : res.json({ profileImage: user.profileImage });
      }
    });
  });

  router.get('/:username/profile', function(req, res) {
    User.findOne({ username: req.params.username }, function(err, user) {
      if (err) {
        res.status(404).send({
          error: 'Not Found: ' + err
        });
      } else {
        delete user.password;
        res.json({
          user,
          profileImage: user.profileImage
        });
      }
    });
  });

  /* POST deactivate User */
  router.post('/deactivate', function(req, res, next) {
    passport.authenticate('deactivateUser', function(err, user, info) {
      if (err) {
        return res.json({ error: err });
      }
      if (!user) {
        return res.json({ message: info.message });
      }
      if (user) {
        User.findOneAndUpdate(
          { username: user.username },
          { status: false },
          function(err, user) {
            if (err) {
              res.json({ error: err });
            }
            return res.json({
              user: user,
              message: 'Successfully deactivated user'
            });
          }
        );
      }
    })(req, res, next);
  });

  /* POST re-activate User */
  router.post('/activate', isAuthenticated, function(req, res) {
    User.findOneAndUpdate(
      { username: req.user.username },
      { status: true },
      function(err, user) {
        // In case of any error, return using the done method
        if (err) {
          return res.json({ error: err });
        }
        return res.json({
          user: user,
          message: 'Successfully re-activated user'
        });
      }
    );
  });

  /* POST Delete User */
  router.post('/delete', function(req, res, next) {
    passport.authenticate('deleteUser', function(err, user, info) {
      if (err) {
        return res.json({ error: err });
      }
      if (!user) {
        return res.json({ message: info.message });
      }
      User.findOneAndRemove({ username: user.username }, function(err, user) {
        if (err) {
          return res.json({ error: err });
        }
        return res.json({ message: 'Successfully deleted user' });
      });
    })(req, res, next);
  });

  return router;
};
