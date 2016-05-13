"use strict";

const co = require("co");
const cron = require("cron");
const moment = require("moment-timezone");
const c = require("colors/safe");
const gochiusa = require("./lib");

function log(tag, text, date) {
  console.log(
    c.cyan(moment(date).tz(gochiusa.config.timezone).format("YYYY/MM/DD HH:mm:ss")),
    `[${c.yellow(tag)}]`,
    text.replace(/\n/g, " ")
  );
}

const job = new cron.CronJob("0 0 19,20,22,23 * * *", () => co(function *() {

  const now = new Date();
  const hour = moment(now).tz(gochiusa.config.timezone).hour();
  const context = yield gochiusa.storage.getContext();

  if (hour === 19) {

    // Decide and save themes

    const nextContext = gochiusa.theme.getNextContext(context, now);
    yield gochiusa.storage.saveContext(nextContext);

    log("gentheme", nextContext.themes.join(", "), now);

  } else if (hour === 20) {

    // Tweet notice announcement

    const text = gochiusa.announcement.getAnnouncement(context);
    yield gochiusa.twitter.tweet(text);

    log("notice", text, now);

  } else if (hour === 22) {

    // Tweet start announcement

    const text = gochiusa.announcement.getStartAnnouncement(context);
    yield gochiusa.twitter.tweet(text);

    log("start", text, now);

  } else if (hour === 23) {

    // Tweet finish announcement

    const text = gochiusa.announcement.getFinishAnnouncement(context);
    yield gochiusa.twitter.tweet(text);

    log("finish", text, now);

  }

}).catch(err => {
  console.error(err.stack || err);
  process.exit(1); // eslint-disable-line no-process-exit
}), null, false, gochiusa.config.timezone);

job.start();

log("run", "gochiusa-onedraw-bot started");
