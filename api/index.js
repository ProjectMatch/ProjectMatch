const config = require('./config');
const server = require('./server');

server.listen(config.port, function() {
  console.log(`Express server listening on port ${config.port}`);
});
