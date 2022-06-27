const handlers = require('./handlers');

module.exports = {
  '': handlers.default,
  'ping': handlers.ping,
  'users': handlers.users
};
