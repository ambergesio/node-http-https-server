const { createFile } = require('../../repository/data');
const userValidator = require('../../validators/users.validator');
const hashPassword = require('../../helpers/hashPassword');
const parseData = require('../../helpers/parseData');
const stringifyData = require('../../helpers/stringifyData');

const createUser = (data, cb) => {
    
    if (!data.payload) return cb(400, { error: true, message: 'Invalid data. All fields must be completed' })
    const parsedData = parseData(data.payload);

    userValidator(parsedData, (err, msj) => {
        if (err) return cb(400, {error: err, message: `Invalid data: ${msj}` });
        
        const { firstName, lastName, email, dni, age, phone, address, number, password } = parsedData;
        const newUser = {
            firstName,
            lastName,
            email,
            dni,
            age,
            phone,
            address,
            number,
            password: hashPassword(password)
        };
        const strUser = stringifyData(newUser);

        createFile('users', dni, strUser, (error, data, file) => {
            if (error) return cb(500, { error: true, message: error});
            const parsedData = parseData(data);
            delete parsedData.password;
            return cb(201, { error: false, message: `File '${file}' created successfully.`, data: parsedData });
        });
    });
}

module.exports = createUser;
