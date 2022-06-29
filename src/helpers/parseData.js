const parseData = (str) => {
    if (typeof(str) === "string") {
        // console.log("string parsed!");
        return JSON.parse(str);
    } else {
        // console.log("failed to parse!");
        return {}
    }
};

module.exports = parseData;
