"use strict";

module.exports = {

  twitter: {
    consumer_key: process.env.GODB_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.GODB_TWITTER_CONSUMER_SECRET,
    access_token: process.env.GODB_TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.GODB_TWITTER_ACCESS_TOKEN_SECRET
  },

  timezone: "Asia/Tokyo",

  excludePrevThemes: true,

  themes: [
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

  mainThemes: [
    "ココア",
    "チノ",
    "リゼ",
    "千夜",
    "シャロ",
    "マヤ",
    "メグ"
  ],

  subThemes: [
    "凛",
    "タカヒロ",
    "チノ母",
    "ココア母",
    "リゼ父",
    "千夜祖母",
    "メグ母",
    "ティッピー",
    "ワイルドギース",
    "あんこ",
    "吹き矢部の部長",
    "ココア千夜のクラスメイト"
  ],

  characterFree: [],

  wordThemes: {
    words: [],
    date: []
  }

};
