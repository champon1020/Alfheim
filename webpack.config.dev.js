const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    port: 3000,
    publicPath: "/",
    inline: true,
    contentBase: path.resolve(__dirname, "dist"),
    watchContentBase: true,
    watchOptions: {
      ignored: ["**/.#*"],
    },
  },
});
