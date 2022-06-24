const handlers = require('./handlers/handlers');

module.exports = {
  '': handlers.default,
  'ping': handlers.ping,
  'create': handlers.create,
  'read': handlers.read,
  'delete': handlers.delete,
  'pictures': handlers.pictures,
  'pictures/all': handlers.picturesAll,
  'pictures/delete': handlers.picturesDelete
};