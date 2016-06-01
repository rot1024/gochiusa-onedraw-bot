"use strict";

const assign = require("object-assign-deep");

const defaultConfig = require("../config-default");
// eslint-disable-next-line node/no-missing-require, node/no-unpublished-require
const config = require("../config");

module.exports = assign(defaultConfig, config);
