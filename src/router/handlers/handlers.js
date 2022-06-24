const pictures = require('./pictures');
const { createFile, readFile, deleteFile } = require('../../repository/data');

const handlers = {
    default: (data, cb) => {
        cb(200, { error: false, message: 'Servidor http en node. Rutas: /create?location=<folder_name>&fileName=<file_name>  /read?location=<folder_name>&fileName=<file_name>       /pictures ---- /pictures/all ---- /pictures/delete' });
    },

    ping: (data, cb) => {
        cb(200, { error: false, message: 'ping', data: data});
    },

    create: (data, cb) => {
        if (!data.queryStringObject.location) return cb(400, { error: true, message: 'Please select a folder to save the file (query: location' });
        if (!data.queryStringObject.fileName) return cb(400, { error: true, message: 'Please select a file name (query: fileName)' });
        createFile(data.queryStringObject.location, data.queryStringObject.fileName, data, (error, file) => {
            if (error) return cb(500, { error: true, message: error});
            return cb(201, {error: false, message: `File '${file}' created successfully.`, data: JSON.parse(data.payload) });
        });
    },

    read: (data, cb) => {
        readFile(data.queryStringObject.location, data.queryStringObject.fileName, (error, data, file) => {
            if (error) return cb(500, { error: true, message: error + ` File '${file}' could not be read or does not exist.`});
            return cb(200, { error: error, message: `File '${file}' read successully`, data: JSON.parse(data) });
        })
    },

    delete: (data, cb) => {
        if (!data.queryStringObject.location) return cb(400, { error: true, message: 'Please select a folder where the file is located (query: location' });
        if (!data.queryStringObject.fileName) return cb(400, { error: true, message: 'Please select a file to delete (query: fileName)' });
        deleteFile(data.queryStringObject.location, data.queryStringObject.fileName, (error, file) => {
            if (error) return cb(500, { error: true, message: error + ` It seems that the file '${file}' doesn't exist or it has been already deleted` });
            return cb(200, { error: false, message: `File '${file}' deleted successully`})
        })
    },

    pictures: pictures.pictures,

    picturesAll: pictures.all,

    picturesDelete: pictures.delete,

    notFound: (data, cb) => {
        cb(404, { error: true, message: "What you are looking for, does not exist."});
    }
}

module.exports = handlers;
