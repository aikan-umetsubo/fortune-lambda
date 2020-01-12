'use strict';

const fs = require('fs');

module.exports = class Reader {
  constructor(path) {
    this.path = path;
  }

  read() {
    fs.readFile(this.path, (err, data) => {
      if (!err) {
        return {
          isSuccess: true,
          data: data
        };
      } else {
        return {
          isSuccess: false,
          data: err
        }
      }
    });
  }
};
