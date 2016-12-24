"use strict";

const path = require("path");
const os = require("os");
const fs = require("fs-promise");
const moment = require("moment-timezone");

const config = require("./config");
const utils = require("./utils");

const base = process.cwd();
const contextFilePath = path.resolve(base, "data", "context.json");
const themeLogFilePath = path.resolve(base, "data", "themes.log");

exports.getContext = () => fs.readFile(contextFilePath, "utf8")
    .then(data => JSON.parse(data))
    .catch(() => null);

exports.saveContext = context =>
  fs.writeFile(contextFilePath, JSON.stringify(context));

exports.logThemes = (context, date) =>
  fs.appendFile(
    themeLogFilePath,
    `${moment(date).tz(config.timezone).format("YYYY-MM-DD")} ${utils.getThemeString(context)}${os.EOL}`
  );
