const { updateFile } = require('../../../repository/data');

const updateFunction = (data, cb) => {
    if (!data.queryStringObject.location) return cb(400, { error: true, message: 'Please select a folder to save the file (query: location' });
    if (!data.queryStringObject.fileName) return cb(400, { error: true, message: 'Please select a file name (query: fileName)' });
    updateFile(data.queryStringObject.location, data.queryStringObject.fileName, data, (error, updatedData) => {
        if (error) return cb(500, { error: true, message: error});
        return cb(201, {error: false, message: `File  updated successfully.`, data: updatedData });
    });
}

module.exports = updateFunction;