const express = require('express');
const router = express.Router();
const controller = require('./image.controller');

/**
 * Saves image to the /profile folder in the 'project-match' bucket
 * usage is post to /api/upload/profile?userName=USERNAME
 * Html form should contain the image key "image"
 *
 * Returns imageUrl if success
 *  {
 *   "imageURL": "https://project-match.s3.amazonaws.com/profile/chingu2"
 *  }
 */
router.post('/profile', controller.uploadProfileImage);
router.post('/project', controller.uploadProjectImage);
router.post('/revision', controller.uploadRevisionImage);

module.exports = router;
