const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./passport');
const morgan = require('morgan');
const config = require('./utils/config');

function setupMiddleware(app) {
  app.use(
    cors({
      origin: config.host.name,
      credentials: true,
      preflightContinue: true,
      optionsSuccessStatus: 200
    })
  );

  if (process.env.NODE_ENV !== 'testing') {
    app.use(morgan('dev'));
  }

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
  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = setupMiddleware;
