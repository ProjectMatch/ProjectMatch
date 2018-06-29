require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = process.env.NODE_ENV;

let config = {};

switch (env) {
  case 'dev':
    config = require('./dev');
    break;
  case 'testing':
    config = require('./testing');
    break;
  case 'production':
    config = require('./prod');
  default:
    config = require('./dev');
}

module.exports = config;
