const express = require('express');
const router = express.Router();
const controller = require('./tag.controller');

router.get('/', controller.getTags);
router.get('/setup', controller.setupTags);

module.exports = router;
