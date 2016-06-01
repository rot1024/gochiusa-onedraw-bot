"use strict";

exports.getThemeString = (context, splitter) => {

  if (context.characterFree) return "free";
  if (!Array.isArray(context.themes)) return "";

  const themes = context.themes.join(splitter || ",");

  return themes + (context.wordTheme ? "|" + context.wordTheme : "");

};
