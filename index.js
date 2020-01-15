'use strict';

const Logger = require('./src/logger');
const Reader = require('./src/reader');
const Selector = require('./src/selector');

exports.handler = (event, context, callback) => {

  const logger = new Logger();
  logger.write('event', event);
  logger.write('context', context);

  // select the message
  const selector = new Selector(true, false);
  const cookie = selector.select();
  logger.write('cookie', cookie);

  // read the message
  const reader = new Reader(cookie.path);
  const message = reader.read();
  logger.write('message', message);

  // respond the message
  if (message.isSuccess) {

    const response = {
      "isBase64Encoded": false,
      "statusCode": 200,
      "headers": {
        "fortune-category": cookie.category,
        "fortune-index": cookie.index,
        "fortune-offensive": cookie.offensive
      },
      "body": `{ "body": "${message.content}" }`
    }

    logger.write('response', response);

    callback(null, response);

  } else {
    logger.err(message.data);

    callback(Error(message.data));
  }
};
