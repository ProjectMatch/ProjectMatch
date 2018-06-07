const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const config = require('./utils/config');
const mongoose = require('mongoose');
const initPassport = require('./passport/init');
const apiRouter = require('./apiRouter');

const app = express();

mongoose.connect(config.db.mlab, {
  server: {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  }
});

app.use(
  cors({
    origin: config.host.name,
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200
  })
);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: config.sessionSecret,
    resave: false, // forces session to be saved even when there was no change
    saveUninitialized: false, // forces uninitialized sessions to be saved
    cookie: {
      maxAge: 6000000,
      httpOnly: false
    }
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

// Router
app.use('/api', apiRouter);

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

module.exports = app;
