"use strict";

const _ = require("lodash");
const moment = require("moment-timezone");

const config = require("./config");

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// the Fisher-Yates Shuffle
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function generateThemes(themes, mainTheme, subTheme, excluded) {

  const candidates = _.difference(themes, [mainTheme, subTheme, ...(excluded || [])]);
  const shuffled = shuffle(candidates);
  return [mainTheme, ..._.take(shuffled, 2), subTheme];

}

function getNextSequence(seq, themes) {

  if (!Array.isArray(seq) || seq.length <= 1) {

    const newseq = shuffle(themes);
    if (newseq[0] === seq[0]) {
      newseq.unshift(newseq.pop());
    }
    return newseq;

  }

  return seq.slice(1);

}

function getNextContext(prevctx) {

  const now = moment().tz(config.timezone);

  const prevContext = Object.assign({}, prevctx);
  const context = {};

  if (config.wordThemes) {

    const dateIndex = _.findIndex(
      config.wordThemes.date,
      d => d[0] === now.month() + 1 && d[1] === now.date()
    );

    if (dateIndex >= 0) {

      context.wordTheme = config.wordThemes.date[dateIndex][2];
      context.wordThemes = prevContext.wordThemes;

    } else if (
      Array.isArray(config.wordThemes.words) &&
      config.wordThemes.words.length > 0
    ) {

      context.wordThemes = getNextSequence(
        prevContext.wordThemes || [],
        _.flatten(config.wordThemes.words)
      );

      context.wordTheme = context.wordThemes[0];

    }

  }

  if (config.characterFree.indexOf(now.day()) >= 0) {

    context.mainThemes = prevContext.mainThemes;
    context.subThemes = prevContext.subThemes;
    context.themes = prevContext.themes;

  } else {

    context.mainThemes = getNextSequence(
      prevContext.mainThemes || [],
      config.mainThemes
    );

    context.subThemes = getNextSequence(
      prevContext.subThemes || [],
      config.subThemes
    );

    // Decide and save themes

    context.themes = generateThemes(
      config.themes,
      context.mainThemes[0],
      context.subThemes[0],
      config.excludePrevThemes ? prevContext.themes || [] : []
    );

  }

  return context;

}

module.exports = {
  generateThemes,
  getNextSequence,
  getNextContext
};
