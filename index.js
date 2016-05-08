"use strict";

const co = require("co");
const cron = require("cron");
const moment = require("moment-timezone");
const gochiusa = require("./lib");

const job = new cron.CronJob("0 0 19,20,22,23 * * *", () => co(function *() {

  const hour = moment().tz(gochiusa.config.timezone).hour();
  const context = yield gochiusa.storage.getContext();

  if (hour === 19) {

    // Detect and save themes

    const nextContext = gochiusa.theme.getNextContext(context);
    yield gochiusa.storage.saveContext(nextContext);

  } else if (hour === 20) {

    // Tweet notice announcement

    const text = gochiusa.announcement.getAnnouncement(context);
    yield gochiusa.twitter.tweet(text);

  } else if (hour === 22) {

    // Tweet start announcement

    const text = gochiusa.announcement.getStartAnnouncement(context);
    yield gochiusa.twitter.tweet(text);

  } else if (hour === 23) {

    // Tweet finish announcement

    const text = gochiusa.announcement.getFinishAnnouncement(context);
    yield gochiusa.twitter.tweet(text);

  }

}).catch(err => {
  console.error(err.stack || err);
  process.exit(1); // eslint-disable-line no-process-exit
}), null, false, gochiusa.config.timezone);

job.start();
