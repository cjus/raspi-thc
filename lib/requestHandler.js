const Promise = require('bluebird');
const ServerResponse = require('./serverResponse');
const serverResponse = new ServerResponse;
const timeHackerClock = require('./timeHackerClock');

const url = require('url');
const path = require('path');
const fs = require('fs');

const HTTP_OK = 200;
const INFO = 'info';
const ERROR = 'error';
const FATAL = 'fatal';
const FIVE_SECONDS = 5;

/**
* @name RequestHandler
* @description A module which ...
*/
class RequestHandler {
  /**
  * @name constructor
  * @return {undefined}
  */
  constructor() {
    this.config = null;
    this.handlers = [];
  }

  /**
  * @name init
  * @summary Initialize the service router using a route object
  * @param {object} config - configuration object
  * @return {undefined}
  */
  init(config) {
    this.config = config;
    this.requestTimeout = this.config.requestTimeout || FIVE_SECONDS;
    this.serviceName = config.serviceName();
  }

  /**
  * @name shutdown
  * @summary shutdown service router
  * @return {object} Promise - promise resolving if success or rejection otherwise
  */
  shutdown() {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  /**
  * @name log
  * @summary log a message
  * @param {string} type - type (info, error, fatal)
  * @param {string} message - message to log
  * @return {undefined}
  */
  log(type, message) {
    console.log('message', message);
  }

  /**
  * @name processHTTPRequest
  * @summary Process HTTP requests
  * @param {object} request - Node HTTP request object
  * @param {object} response - Node HTTP response object
  * @return {object} Promise - promise resolving if success or rejection otherwise
  */
  processHTTPRequest(request, response) {
    return new Promise((resolve, _reject) => {
      if (request.method === 'POST' || request.method === 'PUT') {
        let body = [];
        request.on('data', (data) => {
          body.push(data);
        });
        request.on('end', () => {
          let newBody = Buffer.concat(body);
          // do something with this?
          serverResponse.sendOk(response, {
            result: {}
          });
          resolve();
        });
      } else {
        if (request.method === 'GET') {
          if (request.url === '/') {
            let filePath = path.join(__dirname, '../public/index.html');
            let stat = fs.statSync(filePath);
            response.writeHead(HTTP_OK, {
              'Content-Type': 'text/html',
              'Content-Length': stat.size
            });
            let readStream = fs.createReadStream(filePath);
            readStream.pipe(response);
          } else if (request.url.includes('/v1/thc/range')) {
            let segments = request.url.split('/');
            serverResponse.sendOk(response, {
              result: {
                start: segments[4],
                end: segments[5]
              }
            });
          } else if (request.url.includes('/v1/thc/test')) {
            let segments = request.url.split('/');
            timeHackerClock.test(segments[4], segments[5], segments[6], segments[7])
            serverResponse.sendOk(response, {
              result: {}
            });
          } else if (request.url.includes('/v1/thc/heat')) {
            let segments = request.url.split('/');
            timeHackerClock.heat(segments[4], segments[5], segments[6])
            serverResponse.sendOk(response, {
              result: {}
            });
          } else {
            serverResponse.sendNotFound(response, {
              result: {}
            });
          }
        } else {
          serverResponse.sendMethodNotImplemented(response, {
            result: {}
          });
        }
        resolve();
      }
    });
  }
}

module.exports = new RequestHandler();
