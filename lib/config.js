"use strict";

const assign = require("object-assign-deep");

const defaultConfig = require("../config-default");

let config = {};
try {
  // eslint-disable-next-line node/no-missing-require, node/no-unpublished-require
  config = require("../config");
} catch (e) {
  // ignore
}

module.exports = assign({}, defaultConfig, config);
