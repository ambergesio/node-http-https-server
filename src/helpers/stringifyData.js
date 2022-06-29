const stringifyData = (obj) => {
    if (typeof(obj) === 'object') {
        // console.log("object stringified!");
        return JSON.stringify(obj, null, 4);
    } else {
        // console.log("failed to stringify!");
        return "";
    }
};

module.exports = stringifyData;
