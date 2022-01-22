'use strict';

const fs = require('fs');

module.exports = class File {
  constructor(path) {
    this.path = path;
  }

  readAll() {
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
