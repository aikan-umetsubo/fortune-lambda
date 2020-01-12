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
    return {
      offensive: false,
      category: "art",
      index: "00000",
      path: `./messages/art/00000`
    };
  }

  selectOffensive = () => {
    return {
      offensive: true,
      category: "black-humor",
      index: "00077",
      path: `./messages/offensive/black-humor/00077`
    };
  }

  selectAll = () => {
    return {
      offensive: true,
      category: "definitions",
      index: "00330",
      path: `./messages/offensive/definitions/00330`
    };
  }
};
