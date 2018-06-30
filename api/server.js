require('dotenv').config({ path: `${__dirname}/.env` });

const express = require('express');
const setupMiddlewares = require('./middleware');
const apiRouter = require('./apiRouter');
const connect = require('./db');
const app = express();

connect();
setupMiddlewares(app);

// Router
app.use('/api', apiRouter);

// 404 Handler
app.use(function(req, res, next) {
  res.sendStatus(404);
});

// 500 Handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.sendStatus(500);
});

module.exports = app;
