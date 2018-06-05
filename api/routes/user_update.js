var express = require('express');
var router = express.Router();
var isAuthenticated = require('../utils/authentication');
var User = require('../models/Users');

module.exports = function(passport) {
  router.post('/public', isAuthenticated, function(req, res) {
    var userId = req.body.userId;
    var updateObject = req.body;
    delete updateObject.userId;

    User.findOneAndUpdate(
      { _id: userId },
      updateObject,
      { new: true },
      function(err, user) {
        if (err) {
          return res.json({ error: err });
        } else if (!user) {
          return res.json({ error: 'User ' + userId + 'does not exist' });
        } else {
          return res.json({
            user: user,
            message: 'Successfully updated user details'
          });
        }
      }
    );
  });

  router.post('/personal', isAuthenticated, function(req, res) {
    var userId = req.body.userId;
    var updateObject = req.body;
    delete updateObject.userId;
    console.log(updateObject);

    User.findByIdAndUpdate(userId, updateObject, { new: true }, function(
      err,
      user
    ) {
      if (err) {
        return res.json({ error: err });
      } else if (!user) {
        return res.json({ error: 'User ' + userId + 'does not exist' });
      } else {
        return res.json({
          user: user,
          message: 'Successfully updated user personal details'
        });
      }
    });
  });
  return router;
};
