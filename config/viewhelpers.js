// //here we are difining a functions which will be there the app
// const path = require("path");
// const fs = require("fs");
// const env = require("./enviornment");
// module.exports = (app) => {
//   app.locals.assetPath = function (filePath) {
//     if (env.name == "development") {
//       return filePath;
//     }
//     return (
//       "/" +
//       JSON.parse(
//         fs.readFileSync(
//           path.join(__dirname, "../public/assets/rev-manifest.json")
//         )
//       )[filePath]
//     );
//   };
// };

const env = require("./enviornment");
const fs = require("fs");
const path = require("path");

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
