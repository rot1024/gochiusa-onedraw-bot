"use strict";

const _ = require("lodash");
// eslint-disable-next-line node/no-missing-require, node/no-unpublished-require

exports.generateThemes = (themes, prevThemes, count) => {
  return _.chain(themes)
    .difference(prevThemes)
    .sampleSize(count)
    .value();
};

exports.getNextContext = (context, themes) => {
  return {
    themes
  };
};
