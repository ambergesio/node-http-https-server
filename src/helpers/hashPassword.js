const crypto = require('crypto');
const config = require('../config');


const hashedPassword = (str) => {
    return crypto.createHmac('sha256', config.secret).update(str).digest('hex');
}

module.exports = hashedPassword;
