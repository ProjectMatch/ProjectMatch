const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const multerS3 = require('multer-s3');
// credentials from aws
const aws_secret = require('../utils/s3_config.json');
const router = express.Router();
const AWS = require('aws-sdk');

AWS.config.update(aws_secret);
const s3 = new AWS.S3();

const Projects = require('../models/Projects');
const User = require('../models/Users');
const UserDetails = require('../models/UserDetails');
const Revisions = require('../models/Revisions');
/**
 * FOR USER
 */
// Saves image to the /profile folder in the 'project-match' bucket
// usage is post to /api/upload/profile?userName=USERNAME
// Html form should contain the image key "image"
/**
 * Retruns imageUrl if success
 * {
    "imageURL": "https://project-match.s3.amazonaws.com/profile/chingu2"
}
 */
router.post('/profile', function(req, res) {
  console.log('Posting to profile');
  let fileName = req.query.userName;
  console.log(fileName);
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-match/profile',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function(req, file, cb) {
        cb(null, fileName + '_' + Date.now());
      }
    })
  });

  const uploadingHandler = upload.single('image');
  uploadingHandler(req, res, function(err) {
    if (err) {
      // file not uploaded to aws
      console.log(err);
      return res.json({
        error: 'Profile Image Upload not successfull ' + err.message
      });
    } else {
      console.log('Successfully uploaded profile pic');
      User.findOneAndUpdate(
        { _id: req.query.userName },
        { profileImage: req.file.location },
        { new: true },
        function(err, user) {
          if (err || !user) {
            return res.json({
              error: 'Error in saving image urls to user: ' + err
            });
          } else {
            UserDetails.findOne(
              {
                username: user.username
              },
              function(err, userDetail) {
                if (err || !userDetail) {
                  return res.json({
                    error: 'Error in retreiving userDetails'
                  });
                } else {
                  return res.json({
                    user: user,
                    userDetail: userDetail,
                    imageURL: req.file.location,
                    message: 'Successfully saved profile image'
                  });
                }
              }
            );
          }
        }
      );
    }
  });
});

// NOTE: Should have "projectId"
router.post('/project', function(req, res) {
  console.log('Posting to project');
  let fileName = req.query.projectId;
  console.log(fileName);
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-match/project',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function(req, file, cb) {
        cb(null, fileName);
      }
    })
  });

  const uploadingHandler = upload.single('image');
  uploadingHandler(req, res, function(err) {
    if (err) {
      // file not uploaded to aws
      console.log(err);
      return res.json({
        error: 'Image Upload not successfull ' + err.message
      });
    } else {
      console.log('Successfully uploaded project image');
      Projects.findByIdAndUpdate(
        req.query.projectId,
        {
          images: [req.file.location]
        },
        {
          new: true
        },
        function(err, project) {
          if (err || !project) {
            return res.json({
              error: 'Error in saving image urls to project: ' + err
            });
          } else {
            return res.json({
              project: project,
              imageURL: req.file.location,
              message: 'Successfully saved project image'
            });
          }
        }
      );
    }
  });
});

// NOTE: Should have "revisionId"
router.post('/revision', function(req, res) {
  console.log('Posting to revision');

  const revision = new Revisions({
    revisionNumber: req.query.revisionNumber,
    creator: req.query.user,
    project: mongoose.Types.ObjectId(req.query.projectId)
  });

  revision.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      let fileName = revision._id.toString();

      console.log('type of filename', typeof fileName);

      const upload = multer({
        storage: multerS3({
          s3: s3,
          bucket: 'project-match/revision',
          acl: 'public-read',
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key: function(req, file, cb) {
            console.log('file:', file);
            cb(null, fileName);
          }
        })
      });

      const uploadingHandler = upload.single('image');
      uploadingHandler(req, res, function(err) {
        if (err) {
          // file not uploaded to aws
          return res.send({
            error: 'Image Upload not successfull ' + err.message
          });
        } else {
          Revisions.findByIdAndUpdate(
            revision._id,
            {
              imageURL: req.file.location
            },
            {
              new: true
            },
            function(err, revision) {
              if (err || !revision) {
                res.json({
                  error: 'Error in uploading revision images: ' + err
                });
              } else {
                return res.json({
                  revision: revision,
                  imageURL: req.file.location,
                  message: 'Successfully saved revision image'
                });
              }
            }
          );
        }
      });
    }
  });
});

module.exports = router;
