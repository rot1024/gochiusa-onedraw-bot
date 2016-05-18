"use strict";

const Table = require("cli-table");

// eslint-disable-next-line node/no-missing-require, node/no-unpublished-require
const config = require("../config");

const english = {
  ココア: "Cocoa",
  チノ: "Chino",
  リゼ: "Rize",
  千夜: "Chiya",
  シャロ: "Syaro",
  マヤ: "Maya",
  メグ: "Megu",
  青山ブルーマウンテン: "Aoyama",
  モカ: "Mocha"
};

module.exports = themes => {

  const names = config.themes;
  const subnames = config.subThemes;
  const head = [...names.map(n => english[n])];
  const table = new Table({ head: ["", ...head] });

  const map = new Map();
  themes.forEach(e => e.forEach(f => {
    const obj = map.get(f) || {};
    e.forEach(g => {
      obj[g] = (obj[g] || 0) + 1;
    });
    map.set(f, obj);
  }));

  table.push(...names.map(n => {
    const v = map.get(n);
    if (!v) return null;
    return { [english[n]]: names.map(hh => v[hh] || 0) };
  }).filter(h => h));

  console.log(table.toString());
  console.log(subnames.map(n => n + ": " + (map.get(n) || { [n]: 0 })[n]).join(" | "));

};
