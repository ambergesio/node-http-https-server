const http = require('http');
const https = require('https');
const config = require('../config');

const unifiedServer = require('../unifiedserver');
const httpsOptions = require('../unifiedserver/options');


const httpServer = http.createServer( (req, res) => {
  unifiedServer(req, res);
});
const httpsServer = https.createServer( httpsOptions, (req, res) => {
  unifiedServer(req, res);
});


const server = {
  
  init: () => {
    httpServer.listen(config.httpPort, () => {
      console.log(`Server running on http://localhost:${config.httpPort} in ${config.envName} mode`);
    });
    httpsServer.listen(config.httpsPort, () => {
      console.log(`Server running on https://localhost:${config.httpsPort} in ${config.envName} mode`);
    });
  }
};


module.exports = server;
