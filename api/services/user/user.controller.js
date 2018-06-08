const User = require('../models/Users');

function getUsers(req, res) {
  const conditions = {};

  return User.find(conditions, function(err, users) {
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
  const conditions = { username: req.params.username };

  User.findOne(conditions, function(err, user) {
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
  const conditions = { username: req.params.username };

  User.findOne(conditions, function(err, user) {
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

function deactivateUser(req, res) {
  const update = {
    status: false
  };
  const conditions = {
    username: req.username
  };

  User.findOneAndUpdate(conditions, update, function(err, user) {
    if (err) {
      res.json({ error: err });
    }
    delete user.password;
    return res.json({
      user,
      message: 'Successfully deactivated user'
    });
  });
}

function reactivateUser(req, res) {
  const conditions = {
    username: req.user.username
  };
  const update = {
    status: true
  };

  User.findOneAndUpdate(conditions, update, function(err, user) {
    if (err) {
      return res.json({ error: err });
    }
    return res.json({
      user: user,
      message: 'Successfully re-activated user'
    });
  });
}

function deleteUser(req, res) {
  const conditions = { username: user.username };

  User.findOneAndRemove(conditions, function(err, user) {
    if (err) {
      return res.json({ error: err });
    }
    return res.json({ message: 'Successfully deleted user' });
  });
}

function updatePublicDetails(req, res) {
  const userId = req.body.userId;
  const update = req.body;
  delete update.userId;

  User.findOneAndUpdate(
    { username: user.username },
    update,
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
  const update = req.body;
  const options = { new: true };
  delete update.userId;

  User.findByIdAndUpdate(userId, update, options, function(err, user) {
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
