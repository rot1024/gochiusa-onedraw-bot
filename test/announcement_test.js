"use strict";

const assert = require("assert");
const announcement = require("../lib/announcement");

describe("announcement", () => {

  it("should generate notice announcement", () => {
    const text = announcement.getAnnouncement({
      themes: ["ココア", "チノ", "リゼ", "ティッピー"],
      date: new Date("2016-05-07T09:00:00.000Z")
    });
    assert.strictEqual(text, (
`次回5月7日22時より開始します。
お題は「ココア・チノ・リゼ・ティッピー」となります。
（お題は目安です）
#ごちうさ版深夜の真剣お絵描き60分一本勝負`
    ));
  });

  it("should generate start announcement", () => {
    const text = announcement.getStartAnnouncement({
      themes: ["ココア", "チノ", "リゼ", "ティッピー"],
      date: new Date("2016-05-07T09:00:00.000Z")
    });
    assert.strictEqual(text, (
`開始の時間となりました、タグを付けてご参加ください。
お題は「ココア・チノ・リゼ・ティッピー」となります。
（お題は目安です）
#ごちうさ版深夜の真剣お絵描き60分一本勝負`
    ));
  });

});
