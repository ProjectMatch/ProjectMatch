const express = require('express');
const router = express.Router();
const isAuthenticated = require('../utils/authentication');
const controller = require('./user.controller');

router.get('/users', controller.getUsers);
router.get('/:username/profile/picture', controller.getProfileImage);
router.get('/:username/profile', controller.getProfile);
router.post('/deactivate', controller.deactivateUser);
router.post('/activate', isAuthenticated, controller.deactivateUser);
router.post('/delete', controller.deleteUser);
router.post('/public', isAuthenticated, controller.updatePublicDetails);
router.post('/personal', isAuthenticated, controller.updatePrivateDetails);

module.exports = router;
