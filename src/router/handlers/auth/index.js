const validateUser = require("../../../helpers/validateUser");
const generateTokenId = require("../../../helpers/generateTokenId");


const authLogin = (data, cb) => {
    if (!data.payload) return cb(400, { error: true, message: 'You must send a payload in order to continue'});

    //returns error, user data and file name
    validateUser(data.payload, (error, data, file) => {
        if (error) return cb( 400, { error: true, message: `Invalid user. Error: ${error}`} );
        const generatedToken = generateTokenId(30);
        const expiresIn = Date.now() + 3600000;
        const token = `${generatedToken}*${data.dni}*${expiresIn}`

        return cb( 200, { error: error, message: "Valid user, you may continue.", data, file, token });
    });
}

module.exports = { authLogin };
