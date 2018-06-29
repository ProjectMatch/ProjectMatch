const express = require('express');
const router = express.Router();
const controller = require('./password.controller');

router.get('/:token', controller.tokenIsExpired);
router.post('/', controller.resetPassword);

module.exports = router;
