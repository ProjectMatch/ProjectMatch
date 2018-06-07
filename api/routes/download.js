const express = require('express');
const aws_secret = require('../utils/s3_config.json');
const AWS = require('aws-sdk');
const router = express.Router();
const s3 = new AWS.S3();

AWS.config.update(aws_secret);

// GET for profile image
//@parms "userName" as a query parameter
//@returns aws url
router.get('/profile', function(req, res) {
  console.log('got the request for profile');

  const urlParams = {
    Bucket: 'project-match',
    Key: 'profile/' + req.query.userName
  };
  console.log(urlParams);
  s3.getSignedUrl('getObject', urlParams, function(err, url) {
    if (err) {
      res.json({ error: err.message });
    }
    console.log('the url of the image is', url);
    res.json({ url: url, message: 'Successfully retrieved profile image URL' });
  });
});

// GET for project images
//@parms "projectId" as a query parameter
//@returns aws urls
router.get('/project', function(req, res) {
  console.log('got the request for project');

  const getListObject = new Promise(function(resolve, reject) {
    console.log('getListObject()');
    const params = {
      Bucket: 'project-match',
      Delimiter: '/',
      Prefix: 'project/' + req.query.projectId + '/'
    };
    s3.listObjects(params, function(err, data) {
      if (err) {
        console.log('got error');
        reject(err);
      }
      console.log('got data');
      resolve(data.Contents);
    });
  });

  const geturlsArry = function(data) {
    return new Promise(function(resolve, reject) {
      console.log('geturlsArry()');

      const urls = [];

      for (const i = 0; i < data.length; i++) {
        const urlParams = { Bucket: 'project-match', Key: data[i].Key };
        s3.getSignedUrl('getObject', urlParams, function(err, url) {
          if (err) {
            return reject(err);
          }
          urls.push(url);
        });
      }

      setTimeout(() => {
        if (urls.length == data.length) {
          resolve(urls);
        }
      }, 100);
    });
  };

  getListObject
    .then(function(data) {
      geturlsArry(data).then(function(urls) {
        res.json({
          urls: urls,
          message: 'Successfully retrieved project image URL'
        });
      });
    })
    .catch(function(err) {
      res.json({ error: err });
    });
});

module.exports = router;
