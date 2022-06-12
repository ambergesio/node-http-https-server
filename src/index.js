const server = require('./server');
const config = require('./config');
const port = config.port;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port} in ${config.envName} mode`);
});
