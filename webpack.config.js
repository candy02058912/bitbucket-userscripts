const path = require("path");
const WebpackUserscript = require("webpack-userscript");

module.exports = {
  entry: {
    "pr-reviewer-groups": "./src/pr-reviewer-groups/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new WebpackUserscript({
      metajs: false,
      headers: ({ chunkName }) =>
        require(path.join(__dirname, "src", chunkName, "meta.js"))
    })
  ]
};
