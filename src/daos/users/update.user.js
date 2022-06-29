const { updateFile } = require('../../repository/data');
const userUpdateValidator = require('../../validators/usersUpdate.validator');
const parseData = require('../../helpers/parseData');
const hashPassword = require('../../helpers/hashPassword');

const updateUser = (data, cb) => {

    const parsedData = parseData(data.payload);
    if (!data.queryStringObject.id) return cb(400, { error: true, message: 'You must provide an id number in order to edit a user'});

    userUpdateValidator( parsedData, (error, msj) => {
        if (error) return cb(400, { error: true, message: msj });

        if (parsedData.password) {
            const encryptedPassword = hashPassword(parsedData.password);
            parsedData.password = encryptedPassword;
        };

        updateFile('users', data.queryStringObject.id, parsedData, (error, updatedData, file) => {
            if (error) return cb(500, { error: true, message: error});
            
            const parsedData = parseData(updatedData);
            delete parsedData.password;
            return cb(201, {error: false, message: `File '${file}' updated successfully.`, data: parsedData });
        });
    })
}

module.exports = updateUser;
