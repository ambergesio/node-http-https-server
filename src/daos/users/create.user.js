const { createFile } = require('../../repository/data');
const validateUser = require('../../validators/users.validator');
const hashedPassword = require('../../helpers/hashPassword');
const parseData = require('../../helpers/parseData');

const createUser = (data, cb) => {
    
    if (!data.payload) return cb(400, { error: true, message: 'Invalid data. All fields must be completed' })
    const parsedData = JSON.parse(data.payload);

    validateUser(parsedData, (err, msj) => {
        if (err) return cb(400, {error: err, message: `Invalid data: ${msj}` });
        
        const fileName = parsedData.dni;
        const encryptedPassword = hashedPassword(parsedData.password);
        parsedData.password = encryptedPassword;
        const stringData = JSON.stringify(parsedData, null, 4);

        createFile('users', fileName, stringData, (error, data, file) => {
            if (error) return cb(500, { error: true, message: error});
            const parsedData = parseData(data);
            delete parsedData.password;
            return cb(201, { error: false, message: `File '${file}' created successfully.`, data: parsedData });
        });
    });
}

module.exports = createUser;
