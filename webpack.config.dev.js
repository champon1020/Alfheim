const path = require("path");
const webpack = require("webpack");
const outputDir = path.resolve(__dirname, "public");
const dotenv = require("dotenv-webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: outputDir,
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{loader: "ts-loader"}],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader"
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
      filename: "index.html"
    }),
    new dotenv(),
  ],
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, 'src')],
    extensions: [".tsx", ".ts", ".js"],
    plugins:[
      new TsconfigPathsPlugin({ configFile: "tsconfig.json" })
    ]
  },
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
}
