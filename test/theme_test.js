"use strict";

const assert = require("assert");
const _ = require("lodash");
const theme = require("../lib/theme");

describe("theme", () => {

  it("should generate next themes", () => {

    const themes = theme.generateThemes(
      [
        "ココア",
        "チノ",
        "リゼ",
        "千夜",
        "シャロ",
        "マヤ",
        "メグ",
        "青山ブルーマウンテン",
        "モカ",
        "ティッピー",
        "ワイルドギース",
        "あんこ"
      ],
      [
        "ココア",
        "ティッピー",
        "ワイルドギース",
        "あんこ"
      ],
      4
    );

    assert(Array.isArray(themes));
    assert(themes.length > 0);

    // check duplicated values
    assert.strictEqual(_.filter(
      themes,
      (value, index, iteratee) => _.includes(iteratee, value, index + 1)
    ).length, 0);

    assert.strictEqual(_.intersection(
      themes,
      ["ココア", "ティッピー", "ワイルドギース", "あんこ"]
    ).length, 0);

    assert.strictEqual(_.difference(
      themes,
      [
        "ココア",
        "チノ",
        "リゼ",
        "千夜",
        "シャロ",
        "マヤ",
        "メグ",
        "青山ブルーマウンテン",
        "モカ",
        "ティッピー",
        "ワイルドギース",
        "あんこ"
      ]
    ).length, 0);

  });

  it("should generate next context", () => {

    const ctx = theme.getNextContext({
      themes: ["モカ", "あんこ", "ティッピー", "ワイルドギース"],
      date: new Date("2016-05-06T09:00:00.000Z")
    }, new Date("2016-05-07T09:00:00.000Z"));

    assert(Array.isArray(ctx.themes));
    assert.strictEqual(ctx.date.getDate(), 7);

  });

});
