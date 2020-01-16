'use strict';

const categories = require('../build/messages');
const Logger = require('./logger');
const logger = new Logger();

module.exports = class Selector {
  constructor(offensive, all) {
    this.offensive = offensive;
    this.all = all;
  }

  select = () => {
    logger.write(`offensive: ${this.offensive}, all: ${this.all}`);

    if (this.offensive) {
      if (this.all) {
        return this.selectAll();
      } else {
        logger.write('come');
        return this.selectOffensive();
      }
    } else {
      if (this.all) {
        return this.selectAll();
      } else {
        return this.selectNormal();
      }
    }
  }

  selectNormal = () => {
    // select the category
    const normalCategories = categories.filter((c) => { return !(c.offensive); })
    const categoryIndex = Math.floor(Math.random() * normalCategories.length);
    const category =  normalCategories[categoryIndex];

    // select the cookie
    const cookieIndex = Math.floor(Math.random() * category.count);

    // return the cookie
    return {
      offensive: false,
      category: category.label,
      index: categoryIndex,
      path: `./messages/${category.label}/${("0000" + cookieIndex).slice(-5)}`
    };
  }

  selectOffensive = () => {
    // select the category
    const offensiveCategories = categories.filter((c) => { return c.offensive; });
    const categoryIndex = Math.floor(Math.random() * offensiveCategories.length);
    const category =  offensiveCategories[categoryIndex];

    // select the cookie
    const cookieIndex = Math.floor(Math.random() * category.count);

    // return the cookie
    return {
      offensive: true,
      category: category.label,
      index: categoryIndex,
      path: `./messages/offensive/${category.label}/${("0000" + cookieIndex).slice(-5)}`
    };
  }

  selectAll = () => {
    // select the category
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const category =  categories[categoryIndex];

    // select the cookie
    const cookieIndex = Math.floor(Math.random() * category.count);

    // generate the file path
    const filePath = category.offensive ?
      `./messages/offensive/${category.label}/${("0000" + cookieIndex).slice(-5)}` :
      `./messages/${category.label}/${("0000" + cookieIndex).slice(-5)}`;

    // return the cookie
    return {
      offensive: category.offensive,
      category: category.label,
      index: categoryIndex,
      path: filePath
    };
  }
};
