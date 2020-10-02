'use strict';

const fs = require('fs');

module.exports = class Reader {
  constructor(path) {
    this.path = path;
  }

  read() {
    try {
      let rawContent = fs.readFileSync(this.path, { encoding: 'utf8' })
      return {
        isSuccess: true,
        message: rawContent
      };

    } catch (ex) {
      return {
        isSuccess: false,
        message: JSON.stringify(ex)
      };
    }
  }
};
