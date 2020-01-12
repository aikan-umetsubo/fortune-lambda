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

  // respond the message
  if (message.isSuccess) {
    callback(null, {
      message: message.data,
      category: cookie.category,
      index: cookie.index,
      offensive: cookie.offensive
    });
  } else {
    callback(Error(message.data));
  }
}

exports.response = (data, callback) => {
  const response = {
    statusCode: 200,
    body: data
  };

  callback(null, response);
}
