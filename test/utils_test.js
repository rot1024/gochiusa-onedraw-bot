"use strict";

const assert = require("assert");

const utils = require("../lib/utils");

describe("utils", () => {

  it("should return theme string from context", () => {

    const str = utils.getThemeString({
      themes: ["チノ", "マヤ", "メグ", "ココア"]
    });

    assert.strictEqual(str, "チノ,マヤ,メグ,ココア");

    const str2 = utils.getThemeString({
      themes: ["チノ", "マヤ", "メグ", "ココア"],
      characterFree: true
    });

    assert.strictEqual(str2, "free");

  });

});
