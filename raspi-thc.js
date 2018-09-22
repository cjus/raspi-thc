/**
* @name Service entry
* @description This is the service entry point
*/
const http = require('http');
const config = require('./config/config.json');
const version = require('./package.json').version;
const requestHandler = require('./lib/requestHandler');
const timeHackerClock = require('./lib/timeHackerClock');

/**
 * @name setupExitHandlers
 * @description setup exit handlers
 * @return {undefined}
 */
let setupExitHandlers = () => {
  process.on('cleanup', async() => {
    await requestHandler.shutdown();
    process.exit(-1);
  });

  process.on('SIGTERM', () => {
    console.log('fatal', 'Received SIGTERM');
    process.emit('cleanup');
  });
  process.on('SIGINT', () => {
    console.log('fatal', 'Received SIGINT');
    process.emit('cleanup');
  });
  process.on('unhandledRejection', (reason, _p) => {
    console.log('fatal', reason);
    process.emit('cleanup');
  });
  process.on('uncaughtException', (err) => {
    let stack = err.stack;
    delete err.__cached_trace__;
    delete err.__previous__;
    delete err.domain;
    console.log(stack);
    process.emit('cleanup');
  });
};

/**
 * @name main
 * @description Load configuration file and initialize flydrator
 * @return {undefined}
 */
let main = async() => {
  try {
    timeHackerClock.init(5, 20);
    setupExitHandlers();

    let logEntry = `Starting service ${config.serviceName}:${version} on ${config.serviceIP}:${config.servicePort}`;
    console.log(logEntry);

    let server = http.createServer(async (request, response) => {
      await requestHandler.processHTTPRequest(request, response)
        .catch((err) => {
          console.log('fatal', err);
        });
    });
    server.listen(config.servicePort);
  } catch (err) {
    let stack = err.stack;
    console.log(stack);
    process.emit('cleanup');
  }
};

main();
