'use strict';

const fs = require('fs');

export function handler(event, context, callback) {
  fs.readFile('./messages/art/00000', (err, data) => {
    response(data, callback);
  });
}

export function response(body, callback) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
}
