const _users = require('./users');


const handlers = {
    default: (data, cb) => {
        cb(200, { error: false, message: 'Servidor http en node. Rutas: /create?location=<folder_name>&fileName=<file_name>  /read?location=<folder_name>&fileName=<file_name>       /pictures ---- /pictures/all ---- /pictures/delete' });
    },

    ping: (data, cb) => {
        cb(200, { error: false, message: 'ping', data: data});
    },

    users: (data, cb) => {
        const usersMethods = { get: "get", post: "post", put: "put", delete: "delete"};
        
        if (!usersMethods[data.method]) return cb(405, { error: true, messaage: 'Method not allowed.'});
        _users[data.method](data, cb);
    },

    notFound: (data, cb) => {
        cb(404, { error: true, message: "What you are looking for, does not exist."});
    }
}

module.exports = handlers;
