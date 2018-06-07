const aws_secret = require('../utils/s3_config.json');
const AWS = require('aws-sdk');
AWS.config.update(aws_secret);
const s3 = new AWS.S3();

function getProfileImage(req, res) {
  const urlParams = {
    Bucket: 'project-match',
    Key: 'profile/' + req.query.userName
  };

  s3.getSignedUrl('getObject', urlParams, function(err, url) {
    if (err) {
      res.json({ err });
    }
    res.json({ url, message: 'Successfully retrieved profile image URL' });
  });
}

function getProjectImages(req, res) {
  const getListPromise = new Promise(function(resolve, reject) {
    const params = {
      Bucket: 'project-match',
      Delimiter: '/',
      Prefix: 'project/' + req.query.projectId + '/'
    };
    s3.listObjects(params, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data.Contents);
    });
  });

  const getURLArray = function(data) {
    return new Promise(function(resolve, reject) {
      const urls = [];

      for (let i = 0; i < data.length; i++) {
        let urlParams = { Bucket: 'project-match', Key: data[i].Key };
        s3.getSignedUrl('getObject', urlParams, function(err, url) {
          if (err) {
            return reject(err);
          }
          urls.push(url);
        });
      }

      if (urls.length === data.length) {
        resolve(urls);
      }
    });
  };

  getListPromise
    .then(function(data) {
      getURLArray(data).then(function(urls) {
        res.json({
          urls: urls,
          message: 'Successfully retrieved project image URL'
        });
      });
    })
    .catch(function(err) {
      res.json({ error: err });
    });
}

module.exports = {
  getProfileImage,
  getProjectImages
};
