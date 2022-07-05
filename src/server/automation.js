const parseData = require('../helpers/parseData');
const { readFolder, readFile, deleteToken } = require('../repository/data');

const automation = {
    init: () => {
        console.log("Automation started", new Date());
        setInterval(() => {
            readFolder('tokens', (error, files) => {
                if (!error && files) {
                    files.forEach(file => {
                        const fileName = file.replace('.json', '');
                        readFile('tokens', fileName, (error, data, file) => {
                            if (!error && data) {
                                const parsedData = parseData(data);
                                if (parsedData.expiresIn < Date.now()) {
                                    deleteToken('tokens', file );
                                    console.log(`expired token ${file} deleeted at:`, new Date());
                                };
                            };
                        });
                    });
                };
            });
            console.log("Run automation", new Date());
            // automation runs every hour
        }, 3600000);
    }
};
    
module.exports = automation;
