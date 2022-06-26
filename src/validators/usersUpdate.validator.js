const userUpdateValidator = (data, cb) => {

    if (data.dni) return cb(true, "You cannot edit DNI number");
    return cb(false, null);
};

module.exports = userUpdateValidator;
