"use strict";

const co = require("co");

const gochiusa = require("./lib");

const t = new gochiusa.Twitter();

module.exports = (log, debug) => ({
  generateThemes: () => co(function *() {

    const context = yield gochiusa.storage.getContext();
    const nextContext = gochiusa.theme.getNextContext(context);

    yield gochiusa.storage.saveContext(nextContext);
    yield gochiusa.storage.logThemes(nextContext);

    log("gentheme", gochiusa.utils.getThemeString(nextContext));

    return context;

  }),
  announce: () => co(function *() {

    const context = yield gochiusa.storage.getContext();

    const text = gochiusa.announcement.getAnnouncement(context, new Date());
    if (!debug) yield t.tweet(text);

    log("notice");

    return context;

  }),
  start: () => co(function *() {

    const context = yield gochiusa.storage.getContext();

    const text = gochiusa.announcement.getStartAnnouncement(context);
    if (!debug) yield t.tweet(text);

    log("start");

    return context;

  }),
  finish: () => co(function *() {

    const context = yield gochiusa.storage.getContext();

    const text = gochiusa.announcement.getFinishAnnouncement(context);
    if (!debug) yield t.tweet(text);

    log("finish");

    return context;

  }),
  modifyTheme: themes => co(function *() {

    const context = yield gochiusa.storage.getContext();

    const nextContext = Object.assign({}, context, { themes });

    yield gochiusa.storage.saveContext(nextContext);
    yield gochiusa.storage.logThemes(nextContext);

    log("modtheme", gochiusa.utils.getThemeString(nextContext));

    return nextContext;

  })
});
