'use strict';

const fs = require('fs');
const selector = require('./src/selector');

export function handler(event, context, callback) {
  // get randomly selected category and index
  const selector = selector.setOption("");
  const filePath = selector.select();

  fs.readFile(filePath, (err, data) => {
    response(data, callback);
  });
}

export function response(data, callback) {
  const response = {
    statusCode: 200,
    body: data
  };

  callback(null, response);
}
