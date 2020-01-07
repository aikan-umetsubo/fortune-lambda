'use strict';

const fs = require('fs');

export function handler(event, context, callback) {
  fs.readFile('./messages/art/00000', (err, data) => {
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
