const { readFile } = require("../repository/data");
const hashPassword = require("./hashPassword");
const parseData = require("./parseData");


const validateUser = (data, cb) => {

    if (!data) return cb('You must provide dni and password to continue', null, null);
    const logUser = parseData(data);

    if (!logUser.dni || !logUser.password || logUser.dni === undefined || logUser.password === undefined) return cb('You must provide dni and password to continue', null, null);
    const password = hashPassword(logUser.password);
    const id = logUser.dni;

    readFile('users', id, (error, user, file) => {
        if (error) return cb(`An error occurred ${error}`, null, file);

        const savedUser = parseData(user);

        // if (password !== savedUser.password) return cb("Wrong credentials, you must login with a valid account.", null, file);

        if (password === savedUser.password || user.status === "admin") {
            delete savedUser.password;
            return cb( false, savedUser, file);
        };
        return cb( true, "You dont have permission to perform this action", null);
    })
}

module.exports = validateUser;
