const express = require('express');
const router = express.Router();
const controller = require('./download.controller');

/**
 * GET for profile image
 * @param "projectId" as a query parameter
 * @returns aws urls
 */

router.get('/profile', controller.getProfileImage);

/**
 * GET for project images
 * @param "projectId" as a query parameter
 * @returns aws urls
 */

router.get('/project', controller.getProjectImages);

module.exports = router;
