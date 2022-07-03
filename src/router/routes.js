const handlers = require('./handlers');

module.exports = {
  '': handlers.home,
  'users': handlers.users,
  'auth/login': handlers.userLogin,
  'auth/protected': handlers.protectedRoute
};
