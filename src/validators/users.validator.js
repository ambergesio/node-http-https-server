const { firstNameRE, lastNameRE, emailRE, phoneRE, dniRE, ageRE, passwordRE } = require('./verifications');


const userValidator = (data, cb) => {

    if(!data.firstName) return cb(true, "You must provide a user first name");
    if(!firstNameRE.test(data.firstName)) return cb(true, "Name not valid");
    if(!data.lastName) return cb(true, "You must provide a user last name");
    if(!lastNameRE.test(data.lastName)) return cb(true, "Last name not valid");
    if(!data.email) return cb(true, "You must provide a user email");
    if(!emailRE.test(data.email)) return cb(true, "Email not valid");
    if(!data.dni) return cb(true, "You must provide a user DNI number");
    if(!dniRE.test(data.dni)) return cb(true, "DNI number not valid");
    if(!ageRE.test(data.age)) return cb(true, "Age not valid");
    if(!data.phone) return cb(true, "You must provide a phone number");
    if(!phoneRE.test(data.phone)) return cb(true, "Phone number not valid");
    if(!data.address) return cb(true, "You must provide an address");
    if(!data.number) return cb(true, "You must provide an address number");
    if(!data.password) return cb(true, "You must provide a password");
    if(!passwordRE.test(data.password)) return cb(true, "Password must be between 8 and 15 characters, must have at least one number, one Capital letter and one special character $@$!%*?&");
    
    return cb(false, null);
};

module.exports = userValidator;
