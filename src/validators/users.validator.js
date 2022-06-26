const userValidator = (data, cb) => {

    if(!data.firstName) return cb(true, "You must provide a user first name");
    if(!data.lastName) return cb(true, "You must provide a user last name");
    if(!data.dni) return cb(true, "You must provide a user DNI number");
    if(!data.age) return cb(true, "You must provide a user age");
    if(!data.address) return cb(true, "You must provide an address");
    if(!data.number) return cb(true, "You must provide an address number");
    if(!data.password) return cb(true, "You must provide a password");
    
    return cb(false, null);
};

module.exports = userValidator;