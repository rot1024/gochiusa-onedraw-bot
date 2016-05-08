"use strict";

const Twit = require("twit");
// eslint-disable-next-line node/no-missing-require, node/no-unpublished-require
const config = require("../config");

const T = new Twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.access_token,
  access_token_secret: config.twitter.access_token_secret,
  timeout_ms: 60 * 1000
});

exports.tweet = text => T.post("statuses/update", {
  status: text
});
