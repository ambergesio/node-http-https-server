const stringifyData = (obj) => {
    try {
        return JSON.stringify(obj, null, 4);
    }
    catch (e) {
        return "";
    }
};

module.exports = stringifyData;
