const { createFunction, readFunction, deleteFunction, updateFunction } = require('./daos');
const _users = require('./users');


const handlers = {
    default: (data, cb) => {
        cb(200, { error: false, message: 'Servidor http en node. Rutas: /create?location=<folder_name>&fileName=<file_name>  /read?location=<folder_name>&fileName=<file_name>       /pictures ---- /pictures/all ---- /pictures/delete' });
    },

    ping: (data, cb) => {
        cb(200, { error: false, message: 'ping', data: data});
    },

    users: (data, cb) => {
        const allowedMethods = ['get', 'post', 'put', 'delete'];
        if (allowedMethods.indexOf(data.method) > -1) {
           _users[data.method](data, cb);
        } else {
            cb(405, { error: true, messaage: 'Method not allowed.'});
        }
    },

    create: createFunction,

    read: readFunction,

    update: updateFunction,

    delete: deleteFunction,

    notFound: (data, cb) => {
        cb(404, { error: true, message: "What you are looking for, does not exist."});
    }
}

module.exports = handlers;
