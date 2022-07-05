const server = require('./server/server');
const automation = require('./server/automation');


const app = {
    init: server.init,
    automation: automation
};

app.init();
app.automation.init();

module.exports = app;