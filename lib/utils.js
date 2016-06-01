"use strict";

exports.getThemeString = (context, splitter) => {

  if (context.characterFree) return "free";
  if (!Array.isArray(context.themes)) return "";
  return context.themes.join(splitter || ",");

};
