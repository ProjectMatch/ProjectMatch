const express = require('express');
const router = express.Router();
const controller = require('./tag.controller');

router.get('/', controller.getTags);
router.get('/add', controller.addTag);

module.exports = router;
