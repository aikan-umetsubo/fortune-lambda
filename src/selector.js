'use strict';

const categories = require('../build/messages');

module.exports = class Selector {
  constructor(offensive, all) {
    this.offensive = !!offensive;
    this.all = !!all;
  }

  select = () => {
    if (!this.offensive) {
      if (!this.all) {
        return this.selectNormal();
      } else {
        return this.selectAll();
      }
    } else {
      if (!this.all) {
        return this.selectOffensive();
      } else {
        return this.selectAll();
      }
    }
  }

  selectNormal = () => {
    return {
      offensive: false,
      category: "art",
      index: "00000",
      path: `./messages/$cookie.category/$cookie.index`
    };
  }

  selectOffensive = () => {
    return {
      offensive: true,
      category: "black-humor",
      index: `./messages/offensive/$cookie.category$cookie.index`
    };
  }

  selectAll = () => {
    return {
      offensive: true,
      category: "definitions",
      index: "00330"
    };
  }
};
