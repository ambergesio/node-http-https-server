const { deleteFile } = require('../../repository/data');

const deleteUser = (data, cb) => {

    if (!data.queryStringObject.id) return cb(400, { error: true, message: 'You must provide an id number in order to delete a user'});

    deleteFile('users', data.queryStringObject.id, (error, file) => {
        if (error) return cb(500, { error: true, message: error + ` It seems that the file '${file}' doesn't exist or it has been already deleted` });
        return cb(200, { error: false, message: `File '${file}' deleted successfully`})
    })
};

module.exports = deleteUser;
