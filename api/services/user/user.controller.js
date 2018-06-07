const User = require('../models/Users');

function getUsers(req, res) {
  return User.find({}, function(err, users) {
    if (err) {
      return res.json({
        error: 'Error in retrieving users: ' + err
      });
    } else {
      return res.json({
        users: users,
        message: 'Successfully retrieved all users'
      });
    }
  });
}

function getProfileImage(req, res) {
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
}

function getProfile(req, res) {
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
}

// TODO: REVIEW
function deactivateUser(req, res) {
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
}

function reactivateUser(req, res) {
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
}

// TODO: REVIEW
function deleteUser(req, res) {
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
}

function updatePublicDetails(req, res) {
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
}

function updatePrivateDetails(req, res) {
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
}

module.exports = {
  getUsers,
  getProfileImage,
  getProfile,
  deactivateUser,
  reactivateUser,
  deleteUser,
  updatePublicDetails,
  updatePrivateDetails
};
