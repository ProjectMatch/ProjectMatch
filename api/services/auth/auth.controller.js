const passport = require('../../passport');
const User = require('../../models/Users');
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

          req.login(newUser, function(err) {
            if (err) {
              res.sendStatus(500);
            }
          });

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

async function verifyOAuthToken(client, clientId, idToken) {
  // REF: https://developers.google.com/identity/sign-in/web/backend-auth
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: clientId
  });

  const payload = ticket.getPayload();

  const userid = payload['sub'];
  const email = payload['email'];
  const givenName = payload['given_name'];
  const familyName = payload['family_name'];
  const profilePic = payload['picture'];
  const username = givenName + '_' + familyName;

  return {
    userid,
    email,
    givenName,
    familyName,
    profilePic,
    username
  };
}

function googleSignin(req, res) {
  const CLIENT_ID =
    '634604962663-247j6obodp1clln54de1469euufj6vdj.apps.googleusercontent.com';
  const client = new OAuth2Client(CLIENT_ID);
  const idToken = req.body.idToken;

  verifyOAuthToken(client, CLIENT_ID, idToken)
    .then(function(googlePayload) {
      return User.findOne(
        {
          googleId: googlePayload.userid
        },
        function(err, user) {
          if (err) {
            console.error(err);
            return res.json({
              message: 'Google sign in error'
            });
          } else if (user) {
            delete user.password;
            return res.json({
              user,
              message: 'Successfully logged in with Google'
            });
          } else {
            const newUser = new User();
            newUser.firstName = googlePayload.givenName;
            newUser.lastName = googlePayload.familyName;
            newUser.email = googlePayload.email;
            newUser.profileImage = googlePayload.profilePic;
            newUser.googleId = googlePayload.userid;
            newUser.username =
              googlePayload.givenName + '_' + googlePayload.familyName;

            newUser.save(function(err, user) {
              if (err) {
                throw err;
              } else {
                req.login(newUser);
                delete user.password;

                return res.json({
                  user,
                  message: 'Successfully signed up with Google.'
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
