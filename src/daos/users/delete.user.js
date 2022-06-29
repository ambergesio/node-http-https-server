const validateUser = require('../../helpers/validateUser');
const { deleteFile } = require('../../repository/data');

const deleteUser = (data, cb) => {

    if (!data.queryStringObject.id) return cb(400, { error: true, message: "You must provide an id in order to delete an account"});
    const fileId = data.queryStringObject.id;

    validateUser(data.payload, (error, data, id) => {

        if (error) return cb(400, { error: true, message: data });

        deleteFile('users', fileId, (error, file) => {
            if (error) return cb(500, { error: true, message: error + ` It seems that the file '${file}' doesn't exist or it has been already deleted` });
            return cb(200, { error: false, message: `File '${file}' deleted successfully by user ${id}`});
        });
    });
};

module.exports = deleteUser;
