const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    contentBase: outputDir,
    hot: true,
    host: "localhost",
    port: 3000,
    watchContentBase: true,
    watchOptions: {
      ignored: [
        "**/.#*"
      ]
    },
    publicPath: "/",
  },
})
