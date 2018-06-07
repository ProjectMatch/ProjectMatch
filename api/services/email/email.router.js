const express = require('express');
const router = express.Router();
const controller = require('./email.controller');

router.post('/', controller.sendEmail);

module.exports = router;
