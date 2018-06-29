const express = require('express');
const router = express.Router();

router.use('/auth', require('./resources/auth'));
router.use('/forgot', require('./resources/password'));
router.use('/reset', require('./resources/password'));
router.use('/user/update', require('./resources/user'));
router.use('/user', require('./resources/user'));
router.use('/projects/tags', require('./resources/tag'));
router.use('/projects/categories', require('./resources/category'));
router.use('/projects', require('./resources/project'));
router.use('/upload/image', require('./resources/image'));
router.use('/download', require('./resources/download'));
router.use('/email', require('./resources/email'));
router.use(function(req, res, next) {
  res.sendStatus(404);
});

module.exports = router;
