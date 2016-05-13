"use strict";

const co = require("co");
const cron = require("cron");
const moment = require("moment-timezone");
const c = require("colors/safe");

const gochiusa = require("./lib");
const argv = process.argv.slice(1);
const debug = argv.indexOf("--debug") >= 0;
const gentheme = argv.indexOf("--gentheme") >= 0;
const jobs = require("./jobs")(log, debug);

function log(tag, text) {
  console.log(
    c.cyan(moment().tz(gochiusa.config.timezone).format("YYYY/MM/DD HH:mm:ss")),
    `[${c.yellow(tag)}]`,
    text ? text.replace(/\n/g, " ") : ""
  );
}

function createCronJob(schedule, fn) {
  return new cron.CronJob(schedule, () => co(function *() {
    const i = fn(moment().tz(gochiusa.config.timezone));
    const j = [
      jobs.generateThemes,
      jobs.announce,
      jobs.start,
      jobs.finish
    ];
    if (typeof j[i] === "function") {
      yield j[i]();
    } else {
      log("WARN", "invalid mode: " + i);
    }
  }).catch(err => {
    console.error(err.stack || err);
    process.exit(1); // eslint-disable-line no-process-exit
  }), null, false, gochiusa.config.timezone);
}

if (gentheme) {

  log("start", "gentheme mode");
  jobs.generateThemes().then(() => {
    log("exit");
  }).catch(err => {
    console.error(err.stack || err);
  });

} else {

  const job = debug ?
    createCronJob("* * * * * *", date => date.second() % 4) :
    createCronJob("0 0 19,20,22,23 * * *", date => [19, 20, 22, 23].indexOf(date.hour()));

  job.start();

  log("run", "gochiusa-onedraw-bot started" + (debug ? " [DEBUG]" : ""));

}
