const { createFile } = require('../repository/data');
const generateTokenId = require('./generateTokenId');
const parseData = require('./parseData');
const stringifyData = require('./stringifyData');

const createToken = (user, cb) => {
    const generatedToken = generateTokenId(30);
    const createdAt = Date.now();
    const expiresIn = createdAt + 1800000;

    const dataUser = {
        dni: user.dni,
        email: user.email,
        phone: user.phone,
        status: user.status || "standard",
        createdAt,
        expiresIn
    };

    createFile('tokens', generatedToken, stringifyData(dataUser), (error, data, file) => {
        const parsedData = parseData(data);
        if (error) return cb(error, null);
        const token = `${generatedToken}_${parsedData.dni}_${createdAt}`;
        return cb(false, token);
    });
};


module.exports = createToken;
