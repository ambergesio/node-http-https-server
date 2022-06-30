const generateTokenId = (value) => {
    
    const allowedChars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    return [...new Array(value)]
                    .map( char => char = allowedChars.charAt(Math.floor(Math.random() * allowedChars.length)))
                    .join('');
};

module.exports = generateTokenId;
