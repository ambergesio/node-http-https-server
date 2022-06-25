const handlers = require('./handlers');

module.exports = {
  '': handlers.default,
  'ping': handlers.ping,
  'users': handlers.users,
  'create': handlers.create,
  'read': handlers.read,
  'update': handlers.update,
  'delete': handlers.delete
};