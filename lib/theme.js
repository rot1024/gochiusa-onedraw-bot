"use strict";

const _ = require("lodash");
const moment = require("moment-timezone");
// eslint-disable-next-line node/no-missing-require, node/no-unpublished-require
const config = require("../config");

function generateThemes(themes, prevThemes, count) {
  return _.chain(themes)
    .difference(prevThemes)
    .sampleSize(count)
    .value();
}

exports.generateThemes = generateThemes;
exports.getNextContext = (context, date) => {
  return {
    themes: generateThemes(
      config.themes,
      context && context.themes ? context.themes : [],
      config.themeCount
    ),
    date: moment(date).tz(config.timezone).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    }).toDate()
  };
};
