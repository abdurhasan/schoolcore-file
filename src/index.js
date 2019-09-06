/* eslint-disable no-console */
const ENV = require('../env');
const app = require('./app');
const server = app.listen(ENV.PORT);

process.on('unhandledRejection', (reason, p) =>
  console.log('Unhandled Rejection at: Promise ', p, reason)
);
server.on('listening', () =>
  console.log(`Service_file is running on http://${ENV.HOST}:${ENV.PORT} | and Environtment : ${ENV.ENV_NAME}`)
);
