const mongoose = require('mongoose');

const connect = () => {
  return mongoose.connect(config.db.mlab, {
    server: {
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    }
  });
};

module.exports = connect;
