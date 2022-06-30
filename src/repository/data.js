const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, './../../files');
const parseData = require('../helpers/parseData');
const stringifyData = require('../helpers/stringifyData');


const createFile = (dir, file, data, cb) => {
    fs.open(`${baseDir}/${dir}/${file}.json`, 'wx', (error, fileDescriptor) => {
        if (!error && fileDescriptor) {
            fs.writeFile(fileDescriptor, data, (error) => {
                if (!error) {
                    fs.close(fileDescriptor, (error) => {
                        if (!error) {
                            cb(false, data, file);
                        } else {
                            cb('Error closing new file.', null);
                        }
                    })
                } else {
                    cb('Error writing to new file', null);
                }
            });
        } else {
            cb(`Could not create file '${file}' because it already exists.`);
        };
    });
};

const readFile = (dir, file, cb) => {
    fs.readFile(`${baseDir}/${dir}/${file}.json`, 'utf-8', (error, data) => {
        cb(error, data, file);
    });
};

const updateFile = (dir, file, data, cb) => {
    fs.open(`${baseDir}/${dir}/${file}.json`, 'r', (error) => {
        if (error) return cb(`File '${file}' could not be updated because it doesn't exist`, null);
        fs.open(`${baseDir}/${dir}/${file}.json`, 'a+', (error, fd) => {
            if (error) return cb(`An error occurred when trying to open file '${file}'.`, null);
            fs.readFile(fd, 'utf-8', (error, saved) => {
                if (error) return cb(`Error reading the file ${file}`);
                const savedData = parseData(saved);
                const updatedData = {...savedData, ...data};
                const stringifiedData = stringifyData(updatedData);

                fs.truncate(fd, 0, (error) => {
                    if (error) return cb('An error occurred when trying to update the file', null);
                    fs.writeFile(fd, stringifiedData, (error) => {
                        if (error) return cb("An error when trying to save updated data to file", null)
                        fs.close(fd, (error) => {
                            if (error) return cb("error when trying to close file", null);
                            return cb(null, stringifiedData, file);
                        });
                    });
                });
            });
        });
    });
};

const deleteFile = (dir, file, cb) => {
    fs.unlink(`${baseDir}/${dir}/${file}.json`, (error) => {
        if (error) return cb(error, file);
        return cb(null, file);
    })
};

const deleteToken = (dir, file) => {
    fs.unlinkSync(`${baseDir}/${dir}/${file}.json`);
};


module.exports = { createFile, readFile, updateFile, deleteFile, deleteToken };
