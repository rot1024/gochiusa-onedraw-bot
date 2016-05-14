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

exports.generateThemes = (themes, mainTheme, subTheme, excluded) => {

  const candidates = _.difference(themes, [mainTheme, subTheme, ...(excluded || [])]);
  const shuffled = shuffle(candidates);
  return [mainTheme, ..._.take(shuffled, 2), subTheme];

};

exports.getNextSequence = (seq, themes) => {

  if (!Array.isArray(seq) || seq.length <= 1) {

    const newseq = shuffle(themes);
    if (newseq[0] === seq[0]) {
      newseq.unshift(newseq.pop());
    }
    return newseq;

  }

  return seq.slice(1);

};
