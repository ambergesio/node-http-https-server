const { readFile } = require('../../repository/data');
const parseData = require('../../helpers/parseData');

const readUser = (data, cb) => {

    if (!data.queryStringObject.id) return cb(400, { error: true, message: 'You must provide an id number in order to get a user data'});

    readFile('users', data.queryStringObject.id, (error, data, file) => {

        if (error) return cb(404, { error: true, message: error + ` File '${file}' could not be read because it may not exist.`});
        
        const parsedData = parseData(data);
        delete parsedData.password;
        
        return cb(200, { error: error, message: `File '${file}' read successfully`, data: parsedData });
    })
};

module.exports = readUser;
