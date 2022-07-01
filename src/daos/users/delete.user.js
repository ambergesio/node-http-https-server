const verifyToken = require('../../helpers/verifyToken');
const { deleteFile } = require('../../repository/data');

const deleteUser = (data, cb) => {

    if (!data.queryStringObject.id) return cb(400, { error: true, message: "You must provide an id in order to delete an account"});
    const id = data.queryStringObject.id;

    verifyToken(data, (error, tokenData) => {
        if (error) return cb(400, { error: true, message: tokenData });
        
        const { dni, status } = tokenData;
        const fileId = Number(id);

        if ( fileId === dni || status === 'admin') {
            deleteFile('users', fileId, (error, file) => {
                if (error) {
                    return cb(500, { error: true, message: `${error}. It seems that the file '${file}' doesn't exist or it has been already deleted`});
                } else {
                    return cb(200, { error: false, message: `User ${fileId} was successfully deleted`});
                }
            });
        } else {
            return cb(403, { error: true, message: 'Forbidden, how dare you!'})
        }
    });
};

module.exports = deleteUser;
