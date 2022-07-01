const { readFile } = require("../repository/data");
const hashPassword = require("./hashPassword");
const parseData = require("./parseData");


const validateUser = (data, cb) => {

    if (!data) return cb( true, 'You must provide an id and a password to continue', null);

    const { dni, password } = parseData(data);
    if ( !dni || !password || typeof dni !== 'number' || typeof password !== 'string') {
        return cb(true, 'You must provide a valid id and password to continue.', null);
    };

    const hashedPassword = hashPassword(password);
    
    readFile('users', dni, (error, user, file) => {
        if (error) return cb(true, `An error occurred ${error}`, file);

        const savedUser = parseData(user);
        if ( hashedPassword === savedUser.password || savedUser.status === "admin") {
            delete savedUser.password;
            return cb( false, savedUser, file);
        };
        return cb( true, "You dont have permission to perform this action", null);
    })
}

module.exports = validateUser;
