"use strict";

// eslint-disable-next-line node/no-missing-require, node/no-unpublished-require
const config = require("./config");
const theme = require("./lib/theme");

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

const map = new Map();
list.forEach(e => e.forEach(f => {
  const obj = map.get(f) || {
    count: 0,
    pair: {}
  };
  obj.count++;
  e.forEach(g => {
    if (g === f) return;
    obj.pair[g] = (obj.pair[g] || 0) + 1;
  });
  map.set(f, obj);
}));
console.dir(map.entries(), { depth: null });
