require('dotenv').config();

const environment = {

  dev: {
    port: 3000,
    envName: 'development'
  },

  prod: {
    port: 5001,
    envName: 'production'
  }

};

const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';
const config = typeof(environment[currentEnvironment]) === 'object' ? environment[currentEnvironment] : environment.staging;

module.exports = config;