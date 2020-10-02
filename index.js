'use strict';

const Logger = require('./src/common/logger');
const Reader = require('./src/repository/reader');
const Selector = require('./src/service/selector');

const logger = new Logger();

exports.handler = (event, context, callback) => {

  logger.write('execution started', { "event": event, "context": context });

  // get option
  const option = event.path.replace("/", "");

  // select the message
  const selector = new Selector(option);
  const cookie = selector.select();
  logger.write('selected cookie', cookie);

  // read the message
  const reader = new Reader(cookie.path);
  const result = reader.read();
  if (!result.isSuccess || !result.message) {
    callback(Error(result.message));
  }
  logger.write('raw message', result.message);

  // format the message
  const message = result.message.replace(
    /(\n|\t|")/g, (match) => {
      const replaceRule = { "\n": "\\n", "\r": "\\r", "\"": "\\\"" };
      return replaceRule[match];
    }
  );

  // return the message with metadata
  const response = {
    "isBase64Encoded": false,
    "statusCode": 200,
    "headers": {
      "Access-Control-Allow-Origin": "*",
      "fortune-category": cookie.category,
      "fortune-index": cookie.index,
      "fortune-offensive": cookie.offensive
    },
    "body": `{ "message": "${message}" }`
  }

  logger.write('execution finished', { "response": response });

  callback(null, response);
};
