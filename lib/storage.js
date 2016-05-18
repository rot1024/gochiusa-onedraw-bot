"use strict";

const base = process.cwd();
const contextFile = "context.json";
const themeLogFile = "themes.log";

const path = require("path");
const os = require("os");
const fs = require("fs-promise");
const moment = require("moment-timezone");
// eslint-disable-next-line node/no-missing-require, node/no-unpublished-require
const config = require("../config");

const contextFilePath = path.resolve(base, contextFile);
const themeLogFilePath = path.resolve(base, themeLogFile);

exports.getContext = () => {
  return fs.readFile(contextFilePath, "utf8")
    .then(data => JSON.parse(data))
    .catch(() => null);
};

exports.saveContext = context => {
  return fs.writeFile(contextFilePath, JSON.stringify(context));
};

exports.logThemes = (context, date) => {
  return fs.appendFile(themeLogFilePath,
    `${moment(date).tz(config.timezone).format("YYYY-MM-DD")} ${context.themes.join(",")}${os.EOL}`
  );
};
