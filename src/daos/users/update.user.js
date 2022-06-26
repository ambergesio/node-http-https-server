const { updateFile } = require('../../repository/data');
const usersUpdateValidator = require('../../validators/usersUpdate.validator');

const updateUser = (data, cb) => {

    const parsedData = JSON.parse(data.payload);
    if (!data.queryStringObject.id) return cb(400, { error: true, message: 'You must provide an id number in order to edit a user'});

    usersUpdateValidator( parsedData, (err, msj) => {

        if (err) return cb(400, { error: true, message: msj });

        updateFile('users', data.queryStringObject.id, parsedData, (error, updatedData, file) => {
            if (error) return cb(500, { error: true, message: error});
            return cb(201, {error: false, message: `File '${file}' updated successfully.`, data: updatedData });
        });
    })
}

module.exports = updateUser;