const passport = require('../../passport');
const User = require('../models/Users');
const { OAuth2Client } = require('google-auth-library');

function login(req, res) {
  res.json({
    message: 'Successfully logged in.'
  });
}

function logout(req, res) {
  req.logout();
  res.json({
    message: 'Successfully logged out.'
  });
}

function signup(req, res) {
  User.findOne(
    { $or: [{ email: req.body.email }, { username: req.body.username }] },
    function(err, user) {
      if (err) {
        console.error(err);
        res.json({
          message: 'Error signing up.'
        });
      }
      if (user) {
        res.json({
          message: 'User already exists with this email or username.'
        });
      } else {
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.email = req.body.email;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;

        newUser.save(function(err, newUser) {
          if (err) {
            throw err;
          }

          req.login(newUser);

          delete newUser.password;

          return res.json({
            user: newUser,
            message: 'Successfully signed up.'
          });
        });
      }
    }
  );
}

function googleSignin(req, res) {
  const CLIENT_ID =
    '634604962663-247j6obodp1clln54de1469euufj6vdj.apps.googleusercontent.com';
  const client = new OAuth2Client(CLIENT_ID);

  let idToken = req.body.idToken;

  // https://developers.google.com/identity/sign-in/web/backend-auth
  // verify tokenID
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: CLIENT_ID
    });
    let payload = ticket.getPayload();
    let userid = payload['sub'];
    let email = payload['email'];
    let given_name = payload['given_name'];
    let family_name = payload['family_name'];
    let profilePic = payload['picture'];
    let username = given_name + '_' + family_name;

    let returnedObject = {
      userid: userid,
      email: email,
      given_name: given_name,
      family_name: family_name,
      profilePic: profilePic,
      username: username
    };
    return returnedObject;
  }
  // verify token ID
  verify()
    .then(function(googlePayload) {
      return User.findOne(
        {
          googleId: googlePayload.userid
        },
        function(err, user) {
          if (err) {
            return res.json({
              error: err
            });
          } else if (user) {
            delete user.password;
            return res.json({
              user,
              message: 'Successfully logged in with Google'
            });
          } else {
            const newUser = new User();
            newUser.firstName = googlePayload.given_name;
            newUser.lastName = googlePayload.family_name;
            newUser.email = googlePayload.email;
            newUser.profileImage = googlePayload.profilePic;
            newUser.googleId = googlePayload.userid;
            newUser.username =
              googlePayload.given_name + '_' + googlePayload.family_name;

            newUser.save(function(err, user) {
              if (err) {
                throw err;
              } else {
                const newUser = new User({
                  googleId: googlePayload.userid,
                  username: newUser.username,
                  _id: newUser._id
                });

                newUser.save(function(err, userDetail) {
                  if (err) {
                    throw err;
                  }

                  req.logIn(user, function(err) {
                    if (err) {
                      return next(err);
                    }
                    return res.json({
                      user: user,
                      userDetail: userDetail,
                      message: 'Sucessfully registered with Google'
                    });
                  });
                });
              }
            });
          }
        }
      );
    })
    .catch(console.error);
}

module.exports = {
  signup,
  login,
  googleSignin,
  logout
};
