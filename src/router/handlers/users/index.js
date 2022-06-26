const { createUser, readUser, updateUser, deleteUser } = require('../../../daos');


const _users = {
      'post': createUser,
       'get': readUser,
       'put': updateUser,
    'delete': deleteUser
}

module.exports = _users;
