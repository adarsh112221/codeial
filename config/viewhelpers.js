//here we are difining a functions which will be there the app
const path = require("path");
const fs = require("fs");
const { json } = require("express");
const env = require("./enviornment");
module.exports = (app) => {
  app.locals.assetPath = function (filePath) {
    if (env.name == "development") {
      return filePath;
    }
    return (
      "/" +
      JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "../public/assets/rev-manifest.json")
        )
      )[filePath]
    );
  };
};
