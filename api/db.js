const mongoose = require('mongoose');
const config = require('./config');

const connect = () => {
  return mongoose.connect(config.db.url, {
    server: {
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    }
  });
};

module.exports = connect;
