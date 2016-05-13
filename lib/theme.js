"use strict";

const _ = require("lodash");

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

exports.generateThemes = (themes, prevThemes, count) => {
  const candidates = _.difference(themes, prevThemes);
  const shuffled = shuffle(candidates);
  return _.take(shuffled, count);
};

exports.getNextContext = (context, themes) => {
  return {
    themes
  };
};
