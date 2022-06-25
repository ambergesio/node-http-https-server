const { createFile } = require('../../../repository/data');

const createFunction = (data, cb) => {
    if (!data.queryStringObject.location) return cb(400, { error: true, message: 'Please select a folder to save the file (query: location' });
    if (!data.queryStringObject.fileName) return cb(400, { error: true, message: 'Please select a file name (query: fileName)' });
    createFile(data.queryStringObject.location, data.queryStringObject.fileName, data, (error, file) => {
        if (error) return cb(500, { error: true, message: error});
        return cb(201, {error: false, message: `File '${file}' created successfully.`, data: JSON.parse(data.payload) });
    });
}

module.exports = createFunction;