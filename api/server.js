const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const config = require('./utils/config');
const app = express();
const mongoose = require('mongoose');
const initPassport = require('./passport/init');
const routes = require('./routes/index')(passport);
const forgetPasswordRout = require('./routes/forgetPassword');
const passwordResetRout = require('./routes/reset');
const projectsRoute = require('./routes/project')(passport);
const projectsAddRoute = require('./routes/projectAdd')(passport);
const projectsUpdateRoute = require('./routes/projectUpdate')(passport);
const projectsDeleteRoute = require('./routes/projectDelete')(passport);
const tagRoute = require('./routes/tag');
const categoryRoute = require('./routes/category');
const uploadImagesRoute = require('./routes/upload');
const downloadImagesRoute = require('./routes/download');
const imageRoute = require('./routes/image');
const sendEmailRoute = require('./routes/sendEmail');
const userRoute = require('./routes/users')(passport);
const userUpdateRoute = require('./routes/userUpdate')(passport);
const multer = require('multer');
const multerS3 = require('multer-s3');

// // Connect to DB-Local:
// NOTE: Uncomment below line if you want to save data locally
// mongoose.connect(config.db.local);

// Connect to DB-Cloud
// NOTE: Uncomment below line if you want to save data in the cloud(Mlab)
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
app.use(express.static(path.join(__dirname, 'public')));
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

// for using routs
app.use('/api', routes);
app.use('/api/forgot', forgetPasswordRout);
app.use('/api/reset', passwordResetRout);
app.use('/api/user/update', userUpdateRoute);
app.use('/api/user', userRoute);
app.use('/api/projects/tags', tagRoute);
app.use('/api/projects/categories', categoryRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/projects/add', projectsAddRoute);
app.use('/api/projects/update', projectsUpdateRoute);
app.use('/api/projects/delete', projectsDeleteRoute);
app.use('/api/upload/image', imageRoute);
app.use('/api/download', downloadImagesRoute);
app.use('/api/email', sendEmailRoute);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
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
