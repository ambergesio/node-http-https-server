const { readFile } = require('../../repository/data');
const verifyToken = require('../../helpers/verifyToken');
const parseData = require('../../helpers/parseData');

const readUser = (data, cb) => {
    
    if (!data.queryStringObject.id) return cb(400, { error: true, message: "You must provide an id in order to read an account"});
    const id = data.queryStringObject.id;

    verifyToken(data, (error, tokenData) => {
        if (error) return cb(400, { error: true, message: tokenData });
        
        const { dni, status } = tokenData;
        const fileId = Number(id);

        if ( fileId === dni || status === 'admin') {
            readFile('users', data.queryStringObject.id, (error, data, file) => {
                if (error) return cb(404, { error: true, message: error + ` File '${file}' could not be read because it doesn't exist.`});
                const parsedData = parseData(data);
                delete parsedData.password;
                return cb(200, { error: error, message: `File '${file}' read successfully`, data: parsedData });
            })
        } else {
            return cb(403, { error: true, message: 'Forbidden, how dare you!'})
        }
    });
};

module.exports = readUser;
