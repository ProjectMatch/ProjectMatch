const express = require('express');
const router = express.Router();

router.use('/auth', require('./services/auth'));
router.use('/forgot', require('./services/password'));
router.use('/reset', require('./services/password'));
router.use('/user/update', require('./services/user'));
router.use('/user', require('./services/user'));
router.use('/projects/tags', require('./services/tag'));
router.use('/projects/categories', require('./services/category'));
router.use('/projects', require('./services/project'));
router.use('/upload/image', require('./services/image'));
router.use('/download', require('./services/download'));
router.use('/email', require('./services/email'));
router.use(function(req, res, next) {
  res.sendStatus(404);
});

module.exports = router;
