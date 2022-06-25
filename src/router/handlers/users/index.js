const { createFunction, readFunction, updateFunction, deleteFunction } = require('../daos')


const _users = {
      'post': createFunction,
       'get': readFunction,
       'put': updateFunction,
    'delete': deleteFunction
}

module.exports = _users;