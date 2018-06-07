const express = require('express');
const router = express.Router();
const controller = require('./upload.controller');

/**
 * FOR USER
 * Saves image to the /profile folder in the 'project-match' bucket
 * usage is post to /api/upload/profile?fileName=USERNAME
 * Html form should contain the image key "profile"
 */
router.post('/profile', controller.uploadUserImage);

/**
 * FOR PROJECT
 * Saves MULTIPLE images to the /project folder in the 'project-match' bucket
 * usage is post to /api/upload/project?projectId=PROJECTID
 * Html form should contain the image key "projectImages"
 */
router.post('/project', controller.uploadProjectImage);

module.exports = router;
