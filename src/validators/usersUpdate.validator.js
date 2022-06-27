const { firstNameRE, lastNameRE, phoneRE, ageRE, passwordRE } = require('./verifications');


const userUpdateValidator = (data, cb) => {

    if ( data.firstName && !firstNameRE.test(data.firstName.trim())) return cb(true, "Name not valid");
    if ( data.lastName  && !lastNameRE.test(data.lastName.trim()))   return cb(true, "Last name not valid");
    if ( data.age       && !ageRE.test(data.age))                    return cb(true, "Age not valid");
    if ( data.phone     && !phoneRE.test(data.phone))                return cb(true, "Phone number not valid");
    if ( data.password  && !passwordRE.test(data.password))          return cb(true, "Password must be between 8 and 15 characters, must have at least one number, one Capital letter and one special character $@$!%*?&");

    if (data.dni)   return cb(true, "You cannot edit the DNI number");
    if (data.email) return cb(true, "You cannot edit the email");

    return cb(false, null);
};

module.exports = userUpdateValidator;
