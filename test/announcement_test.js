"use strict";

const assert = require("assert");
const announcement = require("../lib/announcement");

describe("announcement", () => {

  it("should generate notice announcement", () => {
    const text = announcement.getAnnouncement({
      themes: ["ココア", "チノ", "リゼ", "ティッピー"]
    }, new Date("2016-05-07T09:00:00.000Z"));
    assert.strictEqual(text, (
`本日5月7日22時からのお題は
「ココア・チノ・リゼ・ティッピー」です。
#ごちうさ版深夜の真剣お絵描き60分一本勝負`
    ));
  });

  it("should generate notice announcement with free character theme", () => {
    const text = announcement.getAnnouncement({
      themes: ["ココア", "チノ", "リゼ", "ティッピー"],
      characterFree: true
    }, new Date("2016-05-07T09:00:00.000Z"));
    assert.strictEqual(text, (
`本日5月7日22時からのお題は
「キャラ自由」です。
#ごちうさ版深夜の真剣お絵描き60分一本勝負`
    ));
  });

  it("should generate notice announcement with word theme", () => {
    const text = announcement.getAnnouncement({
      themes: ["ココア", "チノ", "リゼ", "ティッピー"],
      wordTheme: "うさぎ"
    }, new Date("2016-05-07T09:00:00.000Z"));
    assert.strictEqual(text, (
`本日5月7日22時からのお題は
「ココア・チノ・リゼ・ティッピー」で「うさぎ」です。
（テーマお題は任意参加）
#ごちうさ版深夜の真剣お絵描き60分一本勝負`
    ));
  });

  it("should generate start announcement", () => {
    const text = announcement.getStartAnnouncement({
      themes: ["ココア", "チノ", "リゼ", "ティッピー"]
    });
    assert.strictEqual(text, (
`開始の時間です。タグを付けてご参加ください。
お題は「ココア・チノ・リゼ・ティッピー」です。
（開始時刻は目安です）
#ごちうさ版深夜の真剣お絵描き60分一本勝負`
    ));
  });

  it("should generate start announcement with free character theme", () => {
    const text = announcement.getStartAnnouncement({
      themes: ["ココア", "チノ", "リゼ", "ティッピー"],
      characterFree: true
    });
    assert.strictEqual(text, (
`開始の時間です。タグを付けてご参加ください。
お題は「キャラ自由」です。
（開始時刻は目安です）
#ごちうさ版深夜の真剣お絵描き60分一本勝負`
    ));
  });

  it("should generate start announcement with word theme", () => {
    const text = announcement.getStartAnnouncement({
      themes: ["ココア", "チノ", "リゼ", "ティッピー"],
      wordTheme: "うさぎ"
    });
    assert.strictEqual(text, (
`開始の時間です。タグを付けてご参加ください。
お題は「ココア・チノ・リゼ・ティッピー」で「うさぎ」です。
（開始時刻は目安です）
#ごちうさ版深夜の真剣お絵描き60分一本勝負`
    ));
  });

});
