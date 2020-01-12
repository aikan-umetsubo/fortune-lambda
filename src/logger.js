'use strict'

module.exports = class Logger {
  constructor() { }

  // print the message
  write = (msg, obj) => {
    if (!obj) {
      console.log(msg + ':' + JSON.stringify(obj));
    } else {
      console.log(msg);
    }
  }

  // print the error
  err = (obj) => {
    console.error(JSON.stringify(obj));
  }
}
