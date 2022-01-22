'use strict'

module.exports = class Logger {
  constructor() { }

  // print the general message
  write = (msg, obj) => {
    if (!obj) {
      console.log(msg);

    } else {
      console.log(msg + ':' + JSON.stringify(obj));
    }
  }

  // print the error message
  err = (obj) => {
    console.error(JSON.stringify(obj));
  }
}
