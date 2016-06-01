"use strict";

const config = require("./lib/config");
const theme = require("./lib/theme");
const counter = require("./utils/counter");

// FOR DEBUG

const context = {
  themes: [],
  mainThemes: [],
  subThemes: []
};

const list = [];

for (let i = 0; i < 100; i++) {

  context.mainThemes = theme.getNextSequence(
    context.mainThemes,
    config.mainThemes
  );

  context.subThemes = theme.getNextSequence(
    context.subThemes,
    config.subThemes
  );

  context.themes = theme.generateThemes(
    config.themes,
    context.mainThemes[0],
    context.subThemes[0],
    context.themes
  );

  list.push(context.themes);

  // console.log(context.themes.join(","));
}

counter(list);
