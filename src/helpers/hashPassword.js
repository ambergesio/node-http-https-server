const crypto = require('crypto');
const config = require('../config');


const hashPassword = (str) => {
    return crypto.createHmac('sha256', config.secret).update(str).digest('hex');
}

module.exports = hashPassword;
