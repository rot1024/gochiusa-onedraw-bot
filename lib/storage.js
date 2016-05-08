"use strict";

const base = process.cwd();
const contextFile = "context.json";

const path = require("path");
const fs = require("fs-promise");

const contextFilePath = path.resolve(base, contextFile);

exports.getContext = () => {
  return fs.readFile(contextFilePath, "utf8")
    .then(data => JSON.parse(data))
    .then(data => {
      data.date = new Date(data.date);
      return data;
    })
    .catch(() => ({}));
};

exports.saveContext = context => {
  return JSON.stringify(context)
    .then(data => fs.writeFile(contextFilePath, data));
};
