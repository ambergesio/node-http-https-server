const _users = require('./users');
const { authLogin, checkroute } = require('./auth');
const {staticFile} = require('./static_files');

const handlers = {

    home: async (data, cb) => {
        cb(200, await staticFile('index') );
    },

    users: (data, cb) => {
        const usersMethods = { get: "get", post: "post", put: "put", delete: "delete"};
        
        if (!usersMethods[data.method]) return cb(405, { error: true, messaage: 'Method not allowed.'});
        _users[data.method](data, cb);
    },

    userLogin: (data, cb) => {
        const usedMethods = { post: "post"};
        if (!usedMethods[data.method]) return cb(405, { error: true, message: 'Method no allowed. '} );
        authLogin(data, cb);
    },

    protectedRoute: (data, cb) => {
        const usedMethods = {post: 'post'};
        if (!usedMethods[data.method]) return cb(405, { error: true, message: 'Method not allowed'} );
        checkroute(data, cb);
    },

    notFound: async (data, cb) => {
        cb(404, await staticFile('404'));
    }
}

module.exports = handlers;
