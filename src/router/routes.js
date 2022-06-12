const handlers = require('./handlers/handlers');

module.exports = {
  '': handlers.default,
  'home': handlers.home,
  'pictures': handlers.pictures,
  'pictures/all': handlers.picturesAll,
  'pictures/delete': handlers.picturesDelete
};