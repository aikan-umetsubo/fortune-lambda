'use strict';

const fs = require('fs');

module.exports = class Reader {
  constructor(path) {
    this.path = path;
  }

  read() {
    let content;
    try {
      content = fs.readFileSync(this.path, { encoding: 'utf8' });
    } catch (ex) {
      return {
        isSuccess: false,
        content: JSON.stringify(ex)
      };
    }

    return {
      isSuccess: true,
      content: content
    }
  }
};
