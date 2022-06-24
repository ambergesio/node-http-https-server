const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, './../../files');


const createFile = (dir, file, data, cb) => {
    fs.open(`${baseDir}/${dir}/${file}.json`, 'wx', (error, fileDescriptor) => {
        if (!error && fileDescriptor) {
            const stringData = data.payload;
            fs.writeFile(fileDescriptor, stringData, (error) => {
                if (!error) {
                    fs.close(fileDescriptor, (error) => {
                        if (!error) {
                            cb(false, file);
                        } else {
                            cb('Error closing new file.', null);
                        }
                    })
                } else {
                    cb('Error writing to new file', null);
                }
            });
        } else {
            cb(`Could not create '${file}', Folder '${dir}' may not exist or file may already exist.`);
        }
    });
}

const readFile = (dir, file, cb) => {
    fs.readFile(`${baseDir}/${dir}/${file}.json`, 'utf-8', (error, data) => {
        cb(error, data, file);
    })
};

const deleteFile = (dir, file, cb) => {
    fs.unlink(`${baseDir}/${dir}/${file}.json`, (error) => {
        if (error) return cb(error, file);
        return cb(null, file);
    })

}


module.exports = { createFile, readFile, deleteFile };