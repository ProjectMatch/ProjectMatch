const express = require('express');
const router = express.Router();
const isAuthenticated = require('../utils/authentication');
const User = require('../models/Users');

module.exports = function(passport) {
  router.post('/public', isAuthenticated, function(req, res) {
    const userId = req.body.userId;
    const updateObject = req.body;
    delete updateObject.userId;

    User.findOneAndUpdate(
      { username: user.username },
      updateObject,
      { new: true },
      function(err, userDetail) {
        if (err) {
          return res.json({ error: err });
        } else if (!userDetail) {
          return res.json({ error: 'UserDetail does not exist' });
        } else {
          return res.json({
            user: user,
            userDetail: userDetail,
            message: 'Successfully updated user details'
          });
        }
      }
    );
  });

  router.post('/personal', isAuthenticated, function(req, res) {
    const userId = req.body.userId;
    const updateObject = req.body;
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
        delete user.password;
        return res.json({
          user,
          message: 'Successfully updated user personal details'
        });
      }
    });
  });
  return router;
};
