const verifyToken = (data, cb) => {

    const token = data.headers.authorization.split(' ')[1];
    if (!token) return cb(true, "You habe to login in order to acces this endpoint");
    
    const dataFromToken = token.split('_');
    const tokenFile = dataFromToken[0];
    const tokenDni = dataFromToken[1];
    const tokenDate = dataFromToken[2];
    
    const currentDate = Date.now();

    if ( tokenDate < currentDate) return cb(false, "Token expired, please login again.");

    return cb(false, { tokenFile, tokenDni, currentDate, tokenDate })
}

module.exports = verifyToken;
