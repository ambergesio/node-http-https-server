const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, './../../../');

const staticFile = async (file) => {
    try {
        return await fs.promises.readFile(`${baseDir}/public/${file}.html`, 'utf-8');
    }
    catch (error) {
        return error;
    }
}

module.exports = {staticFile};