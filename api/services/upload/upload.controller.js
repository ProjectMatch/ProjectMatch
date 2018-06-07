const multer = require('multer');
const multerS3 = require('multer-s3');
const aws_secret = require('../utils/s3_config.json');
const AWS = require('aws-sdk');
AWS.config.update(aws_secret);
const s3 = new AWS.S3();

function uploadUserImage(req, res) {
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-match/profile',
      key: function(req, file, callback) {
        console.log('The file location is ' + file.location);
        callback(null, req.query.fileName + '.jpg');
      }
    })
  });

  const uploadingHandler = upload.single('profile');
  uploadingHandler(req, res, function(err) {
    if (err) {
      // file not uploaded to aws
      console.log(err);
      res.json({ error: 'Error in uploading image: ' + err });
    } else {
      console.log('succeefully uploaded');
      res.json({ message: 'Uploaded profile image successfully' });
    }
  });
}

function uploadProjectImage(req, res) {
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'project-match/project/' + req.query.projectId,
      metadata: function(req, file, cb) {
        console.log('req=' + req);
        console.log('file=' + file);
        cb(null, { fieldName: file.fieldname });
      },
      key: function(req, file, cb) {
        const name = Date.now().toString();
        switch (file.mimetype) {
          case 'image/jpeg':
            name += '.jpeg';
          case 'image/png':
            name += '.png';
        }
        cb(null, name);
      }
    })
  });

  // .array uploads multiple images
  const uploadingHandler = upload.array('projectImages');

  uploadingHandler(req, res, function(err) {
    if (err) {
      console.log(err);
      res.json({ error: 'Error in uploading image: ' + err });
    } else {
      console.log(req.query.projectId);
      console.log('Uploaded project image successfully');

      res.json({ message: 'Uploaded project image successfully' });
    }
  });
}

module.exports = {
  uploadUserImage,
  uploadProjectImage
};
