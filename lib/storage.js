"use strict";

const base = process.cwd();
const contextFile = "context.json";

const path = require("path");
const fs = require("fs-promise");

const contextFilePath = path.resolve(base, contextFile);

exports.getContext = () => {
  return fs.readFile(contextFilePath, "utf8")
    .then(data => JSON.parse(data))
    .catch(() => ({}));
};

exports.saveContext = context => {
  return fs.writeFile(contextFilePath, JSON.stringify(context));
};
