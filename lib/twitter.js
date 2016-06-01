"use strict";

const Twit = require("twit");

const config = require("./config");

const T = new Twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.access_token,
  access_token_secret: config.twitter.access_token_secret,
  timeout_ms: 60 * 1000
});

module.exports = class Twitter {

  constructor() {
    this.T = new Twit({
      consumer_key: config.twitter.consumer_key,
      consumer_secret: config.twitter.consumer_secret,
      access_token: config.twitter.access_token,
      access_token_secret: config.twitter.access_token_secret,
      timeout_ms: 60 * 1000
    });
  }

  tweet(text) {
    return this.T.post("statuses/update", {
      status: text
    });
  }

};
