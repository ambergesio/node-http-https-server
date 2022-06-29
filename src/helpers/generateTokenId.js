const generateTokenId = (value) => {

    value = typeof value === 'number' && value > 0 ? value : false;
    if (!value) return false;

    const allowedChars = 'abcdefghijklmnopqrstuvwxyz1234567890-_';
    let generatedToken = '';

    for ( let i = 1; i <= value; i++ ) {
        let randomString = allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
        generatedToken += randomString;
    };

    return generatedToken;
};


module.exports = generateTokenId;
