"use strict";

const _ = require("lodash");
const moment = require("moment-timezone");
// eslint-disable-next-line node/no-missing-require
const config = require("../config");

function generateThemes(themes, prevThemes, count) {
  return _.chain(themes)
    .difference(prevThemes)
    .sampleSize(count)
    .value();
}

exports.generateThemes = generateThemes;
exports.getNextContext = context => {
  return {
    themes: generateThemes(
      config.themes,
      context && context.themes ? context.themes : [],
      config.themeCount
    ),
    date: moment().tz(config.timezone).add(1, "days").set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    }).toDate()
  };
};
