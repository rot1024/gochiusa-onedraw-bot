"use strict";

const os = require("os");
const co = require("co");
const fs = require("fs-promise");

const counter = require("./utils/counter");

co(function *() {

  const themes = (yield fs.readFile("themes.log", "utf8"))
    .split(os.EOL)
    .map(s => s.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2} /, "")
      .split(",")
      .filter(t => t.length > 0)
    ).filter(t => t.length > 0);

  counter(themes);

}).catch(err => {
  console.error(err.stack || err);
});
