const verifyToken = (data, cb) => {

    if (!data.headers.authorization) return cb(true, 'Invalid or missing token(a). Login in order to access');
    const token = data.headers.authorization.split(' ')[1];
    
    const dataFromToken = token.split('_');
    const tokenFile = dataFromToken[0];
    const tokenDni = Number(dataFromToken[1]);
    const tokenDate = Number(dataFromToken[2]);
    
    readFile('tokens', tokenFile, (error, data, file) => {
        if (error) return cb(true, 'Invalid or missing token(b). Login in order to access');

        const { dni, createdAt, expiresIn } = parseData(data);
        const currentDate = Date.now();

        if ( expiresIn < currentDate) {
            deleteToken('tokens', tokenFile);
            return cb(true, 'Token expired. Login again in order to access.');
        }
        if ( tokenDni === dni && tokenDate === createdAt ) return cb(false, { tokenFile, dni, tokenDni, currentDate, expiresIn, tokenDate, createdAt });
        return cb(true, 'Invalid or missing token(c). Login again in order to access.');
    });
};


module.exports = verifyToken;
