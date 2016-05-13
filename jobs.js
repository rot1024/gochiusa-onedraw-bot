"use strict";

const co = require("co");
const gochiusa = require("./lib");

module.exports = (log, debug) => ({
  generateThemes: () => co(function *() {

    const context = yield gochiusa.storage.getContext();

    // Decide and save themes

    const themes = gochiusa.theme.generateThemes(
      gochiusa.config.themes,
      [context.themes].concat(context.prevThemes),
      gochiusa.config.themeCount
    );
    const nextContext = gochiusa.theme.getNextContext(
      context,
      themes,
      gochiusa.config.interval
    );
    yield gochiusa.storage.saveContext(nextContext);

    log("gentheme", nextContext.themes.join(", "));

    return nextContext;
  }),
  announce: () => co(function *() {

    const context = yield gochiusa.storage.getContext();

    // Tweet notice announcement

    const text = gochiusa.announcement.getAnnouncement(context, new Date());
    if (!debug) yield gochiusa.twitter.tweet(text);

    log("notice");

    return context;
  }),
  start: () => co(function *() {

    const context = yield gochiusa.storage.getContext();

    const text = gochiusa.announcement.getStartAnnouncement(context);
    if (!debug) yield gochiusa.twitter.tweet(text);

    log("start");

    return context;
  }),
  finish: () => co(function *() {

    const context = yield gochiusa.storage.getContext();

    const text = gochiusa.announcement.getFinishAnnouncement(context);
    if (!debug) yield gochiusa.twitter.tweet(text);

    log("finish");

    return context;
  })
});
