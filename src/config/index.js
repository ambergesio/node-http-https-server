require('dotenv').config();

const environment = {

  dev: {
    httpPort: 3000,
    httpsPort: 3001,
    envName: 'development'
  },

  prod: {
    httpPort: 5001,
    httpsPort: 5002,
    envName: 'production'
  }

};

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';
const config = typeof(environment[currentEnvironment]) === 'object' ? environment[currentEnvironment] : environment.dev;

module.exports = config;
