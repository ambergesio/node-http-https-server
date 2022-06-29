const validateUser = require("../../../helpers/validateUser");


const auth = (data, cb) => {
    if (!data.payload) return cb(400, { error: true, message: 'You must send a payload in order to continue'})

    validateUser(data.payload, (error, data, file) => {
        if (error) return cb(400, { error: true, message: `Invalid user. Error: ${error}`} );
        return cb(200, { error: error, message: "Valid user, you may continue.", data, file })
    });
}

module.exports = auth;