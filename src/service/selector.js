'use strict';

const categories = require('../../build/messages');
const Logger = require('../common/logger');
const logger = new Logger();

module.exports = class Selector {
  constructor(option) {
    // set flags read from option
    this.offensive = option.includes("o");
    this.all = option.includes("a");
    logger.write(`selector option is specified. offensive: ${this.offensive}, all: ${this.all}.`);
  }

  select = () => {
    // select the category randomly
    const filteredCategories = this.all ?
      categories :
      categories.filter((c) => { return c.offensive == this.offensive });
    const categoryIndex = Math.floor(Math.random() * filteredCategories.length);
    const category =  filteredCategories[categoryIndex];

    // select the cookie randomly
    const cookieIndex = Math.floor(Math.random() * category.count);

    // generate the cookie
    const cookie = {
      offensive: category.offensive,
      category: category.label,
      index: cookieIndex,
      path: category.offensive ?
        `./build/messages/offensive/${category.label}/${("0000" + cookieIndex).slice(-5)}` :
        `./build/messages/${category.label}/${("0000" + cookieIndex).slice(-5)}`
    };

    return cookie;
  }
}
