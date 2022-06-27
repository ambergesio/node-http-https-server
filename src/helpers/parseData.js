const parseData = (str) => {
    if (typeof(str) === "string") {
        console.log("data parsed successfully");
        return JSON.parse(str);
    } else {
        return {}
    }
};

module.exports = parseData;
