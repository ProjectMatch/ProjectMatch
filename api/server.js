const express = require('express');
const setupMiddlewares = require('./middleware');
const apiRouter = require('./apiRouter');
const connect = require('./db');
const app = express();

connect();
setupMiddlewares(app);

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
