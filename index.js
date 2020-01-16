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
  const result = reader.read();
  if (!result.isSuccess) {
    callback(Error(message.data));
  }
  const rawMessage = result.message;
  logger.write('rawMessage', rawMessage);

  // format the message
  const message = rawMessage.replace(
    /(\n|\t)/g, (match) => {
      if (match === "\n") {
        return "\\n";
      } else if (match === "\t") {
        return "\\t";
      } else {
        return null;
      }
    }
  );

  // return the message with metadata
  const response = {
    "isBase64Encoded": false,
    "statusCode": 200,
    "headers": {
      "fortune-category": cookie.category,
      "fortune-index": cookie.index,
      "fortune-offensive": cookie.offensive
    },
    "body": `{ "body": "${content}" }`
  }

  logger.write('response', response);

  callback(null, response);
};
