const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    bundle: "./src/index.js",
  },
  output: {
    filename: "[hash].js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};
