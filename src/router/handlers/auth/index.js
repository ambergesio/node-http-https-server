const validateUser = require("../../../helpers/validateUser");
const verifyToken = require("../../../helpers/verifyToken");
const createToken = require('../../../helpers/createToken');


const authLogin = (data, cb) => {

    validateUser(data.payload, (error, userData, file) => {
        if (error) return cb( 400, { error: true, message: userData} );
        createToken(userData, (error, token) => {
            if (error) return cb(400, { error: true, message: 'Token could not be generated properly. Login again'});
            return cb( 200, { error: error, message: "Valid user, you may continue.", token });
        });
    });
};

const checkroute = (data, cb) => {
    verifyToken(data, (error, tokenData) => {
        if (error) return cb(400, { error: true, message: tokenData});
        return cb(200, { error: false, data: tokenData});
    });
}

module.exports = { authLogin, checkroute };
