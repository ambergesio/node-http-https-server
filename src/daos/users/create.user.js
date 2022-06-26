const { createFile } = require('../../repository/data');
const validateUser = require('../../validators/users.validator');


const createUser = (data, cb) => {
    
    const parsedData = JSON.parse(data.payload);

    validateUser(parsedData, (err, msj) => {
        if (err) return cb(400, {error: true, message: `Invalid data: ${msj}` });
        
        const fileName = parsedData.dni;

        createFile('users', fileName, data, (error, file) => {
            if (error) return cb(500, { error: true, message: error});
            return cb(201, { error: false, message: `File '${file}' created successfully.`, data: parsedData });
        });
    });
}

module.exports = createUser;
