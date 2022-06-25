const { readFile } = require('../../../repository/data');

const readFunction = (data, cb) => {
    readFile(data.queryStringObject.location, data.queryStringObject.fileName, (error, data, file) => {
        if (error) return cb(500, { error: true, message: error + ` File '${file}' could not be read or does not exist.`});
        return cb(200, { error: error, message: `File '${file}' read successully`, data: JSON.parse(data) });
    })
};

module.exports = readFunction;