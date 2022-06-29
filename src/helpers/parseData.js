const parseData = (str) => {
   try {
        return JSON.parse(str);
    }
    catch (error) {
        return {};
    }
};

module.exports = parseData;
