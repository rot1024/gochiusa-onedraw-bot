"use strict";

const co = require("co");
const gochiusa = require("./lib");

module.exports = (log, debug) => ({
  generateThemes: () => co(function *() {

    const context = (yield gochiusa.storage.getContext()) || {
      themes: [],
      mainThemes: [],
      subThemes: []
    };

    context.mainThemes = gochiusa.theme.getNextSequence(
      context.mainThemes,
      gochiusa.config.mainThemes
    );

    context.subThemes = gochiusa.theme.getNextSequence(
      context.subThemes,
      gochiusa.config.subThemes
    );

    // Decide and save themes

    context.themes = gochiusa.theme.generateThemes(
      gochiusa.config.themes,
      context.mainThemes[0],
      context.subThemes[0]
    );

    yield gochiusa.storage.saveContext(context);

    log("gentheme", context.themes.join(", "));

    return context;
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
