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
            cb(`Could not create file '${file}' because it already exists.`);
        }
    });
}

const readFile = (dir, file, cb) => {
    fs.readFile(`${baseDir}/${dir}/${file}.json`, 'utf-8', (error, data) => {
        cb(error, data, file);
    })
};

const updateFile = (dir, file, data, cb) => {
    fs.open(`${baseDir}/${dir}/${file}.json`, 'r', (error) => {
        if (error) return cb(`File '${file}' could not be updated because it doesn't exist`, null);
        fs.open(`${baseDir}/${dir}/${file}.json`, 'a+', (error, fd) => {
            if (error) return cb(`Could not update the file '${file}', it may not exist.`, null);
            fs.readFile(fd, 'utf-8', (error, saved) => {
                if (error) return cb(`Error reading the file ${file}`);
                const savedData = JSON.parse(saved);
                const updatedData = {...savedData, ...data};
                const stringifiedData = JSON.stringify(updatedData, null, 2);
    
                fs.truncate(fd, 0, (error) => {
                    if (error) return cb('An error occurred when trying to update the file', null);
                    fs.writeFile(fd, stringifiedData, (error) => {
                        if (error) return cb("Error when trying to save updated data to file", null)
                        fs.close(fd, (error) => {
                            if (error) return cb("error when trying to close file", null);
                            cb(null, updatedData, file);
                        })
                    })
                })
            })
        })
    })
}

const deleteFile = (dir, file, cb) => {
    fs.unlink(`${baseDir}/${dir}/${file}.json`, (error) => {
        if (error) return cb(error, file);
        return cb(null, file);
    })
};


module.exports = { createFile, readFile, updateFile, deleteFile };