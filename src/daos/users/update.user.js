const { updateFile } = require('../../repository/data');
const userUpdateValidator = require('../../validators/usersUpdate.validator');
const parseData = require('../../helpers/parseData');
const hashPassword = require('../../helpers/hashPassword');
const verifyToken = require('../../helpers/verifyToken');

const updateUser = (data, cb) => {

    const parsedData = parseData(data.payload);
    if (!data.queryStringObject.id) return cb(400, { error: true, message: 'You must provide an id number in order to edit a user'});
    const id = data.queryStringObject.id;

    userUpdateValidator( parsedData, (error, msj) => {
        if (error) return cb(400, { error: true, message: msj });

        if (parsedData.password) {
            const encryptedPassword = hashPassword(parsedData.password);
            parsedData.password = encryptedPassword;
        };

        verifyToken(data, (error, tokenData) => {
            if (error) return cb(400, { error: true, message: tokenData });
            
            const { dni, status } = tokenData;
            const fileId = Number(id);
    
            if ( fileId === dni || status === 'admin') {
                updateFile('users', data.queryStringObject.id, parsedData, (error, updatedData, file) => {
                    if (error) return cb(500, { error: true, message: error});
                    const parsedData = parseData(updatedData);
                    delete parsedData.password;
                    return cb(201, {error: false, message: `File '${file}' updated successfully.`, data: parsedData });
                });
            } else {
                return cb(403, { error: true, message: 'Forbidden, how dare you!'})
            }
        });


    })
}

module.exports = updateUser;
