const express = require('express');
const router = express.Router();
const passport = require('../../passport');
const isAuthenticated = require('../utils/authentication');
const controller = require('./auth.controller');

router.post('/signup', controller.signup);
router.post('/login', passport.authenticate('local'), controller.login);
router.post('/googlelogin', controller.googleSignin);
router.get('/logout', controller.logout);

return router;
