const http = require('http');
const https = require('https');

const unifiedServer = require('./unifiedServer');
const httpsOptions = require('./unifiedServer/options');



const httpServer = http.createServer( (req, res) => {
  unifiedServer(req, res);
});

const httpsServer = https.createServer( httpsOptions, (req, res) => {
  unifiedServer(req, res);
});


module.exports = { httpServer, httpsServer };
