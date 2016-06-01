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
        "モカ"
      ],
      "ココア",
      "タカヒロ",
      ["青山ブルーマウンテン"]
    );

    assert(Array.isArray(themes));
    assert.strictEqual(themes.length, 4);
    assert.strictEqual(themes[0], "ココア");
    assert.strictEqual(themes[3], "タカヒロ");

    // check duplicated values
    assert.strictEqual(_.filter(
      themes,
      (value, index, iteratee) => _.includes(iteratee, value, index + 1)
    ).length, 0);

    assert.strictEqual(_.intersection(
      themes.slice(1, -1),
      ["ココア", "タカヒロ", "青山ブルーマウンテン"]
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
        "タカヒロ"
      ]
    ).length, 0);

  });

  it("should generate next sequence", () => {

    const seq = theme.getNextSequence(
      ["モカ"],
      ["モカ", "あんこ", "ティッピー", "ワイルドギース"]
    );

    assert(Array.isArray(seq));
    assert.notStrictEqual(seq[0], "モカ");

    const seq2 = theme.getNextSequence(
      ["モカ", "あんこ"],
      ["モカ", "あんこ", "ティッピー", "ワイルドギース"]
    );

    assert(Array.isArray(seq2));
    assert.deepEqual(seq2, ["あんこ"]);

  });

});
