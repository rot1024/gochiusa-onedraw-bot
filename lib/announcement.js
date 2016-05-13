"use strict";

const moment = require("moment-timezone");

// eslint-disable-next-line node/no-missing-require, node/no-unpublished-require
const config = require("../config");

exports.getAnnouncement = context => {

  const datestr = moment(context.date).tz(config.timezone).format("M月D日");

  return (
`次回${datestr}22時より開始します。
お題は「${context.themes.join("・")}」となります。
#ごちうさ版深夜の真剣お絵描き60分一本勝負`
  );

};

exports.getStartAnnouncement = context => {

  return (
`開始の時間となりました。タグを付けてご参加ください。
お題は「${context.themes.join("・")}」となります。
（開始時刻は目安です）
#ごちうさ版深夜の真剣お絵描き60分一本勝負`
  );

};

exports.getFinishAnnouncement = () => {

  return (
`終了の時間となりました。皆様お疲れ様でした！
タグ付けされたイラストは順次RTさせていただきます。`
  );

};
