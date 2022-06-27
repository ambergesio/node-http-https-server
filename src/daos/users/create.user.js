const { createFile } = require('../../repository/data');
const validateUser = require('../../validators/users.validator');
const hashedPassword = require('../../helpers/hashPassword');

const createUser = (data, cb) => {
    
    if (!data.payload) return cb(400, { error: true, message: 'Invalid data. All fields must be completed' })
    const parsedData = JSON.parse(data.payload);

    validateUser(parsedData, (err, msj) => {
        if (err) return cb(400, {error: true, message: `Invalid data: ${msj}` });
        
        const fileName = parsedData.dni;
        const encryptedPassword = hashedPassword(parsedData.password);
        parsedData.password = encryptedPassword;
        const stringData = JSON.stringify(parsedData, null, 4);

        createFile('users', fileName, stringData, (error, file) => {
            if (error) return cb(500, { error: true, message: error});
            return cb(201, { error: false, message: `File '${file}' created successfully.`, data: parsedData });
        });
    });
}

module.exports = createUser;
