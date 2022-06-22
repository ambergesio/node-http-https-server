const { httpServer, httpsServer} = require('./server');
const config = require('./config');


httpServer.listen(config.httpPort, () => {
  console.log(`Server running on http://localhost:${config.httpPort} in ${config.envName} mode`);
});
httpsServer.listen(config.httpsPort, () => {
  console.log(`Server running on https://localhost:${config.httpsPort} in ${config.envName} mode`);
});
