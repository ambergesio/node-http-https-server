const { deleteFile } = require('../../../repository/data');

const deleteFunction = (data, cb) => {
    if (!data.queryStringObject.location) return cb(400, { error: true, message: 'Please select a folder where the file is located (query: location' });
    if (!data.queryStringObject.fileName) return cb(400, { error: true, message: 'Please select a file to delete (query: fileName)' });
    deleteFile(data.queryStringObject.location, data.queryStringObject.fileName, (error, file) => {
        if (error) return cb(500, { error: true, message: error + ` It seems that the file '${file}' doesn't exist or it has been already deleted` });
        return cb(200, { error: false, message: `File '${file}' deleted successully`})
    })
};

module.exports = deleteFunction;