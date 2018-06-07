const express = require('express');
const router = express.Router();
const controller = require('./category.controller');

router.get('/', controller.getCategories);
router.get('/setup', controller.setupCategories);

module.exports = router;
