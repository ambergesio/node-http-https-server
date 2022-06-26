const { readFile } = require('../../repository/data');

const readUser = (data, cb) => {

    readFile('users', data.queryStringObject.id, (error, data, file) => {
        if (error) return cb(500, { error: true, message: error + ` File '${file}' could not be read because it may not exist.`});
        return cb(200, { error: error, message: `File '${file}' read successfully`, data: JSON.parse(data) });
    })
};

module.exports = readUser;