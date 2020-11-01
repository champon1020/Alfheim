const path = require("path");
const webpack = require("webpack");
const outputDir = path.resolve(__dirname, "dist");
const Dotenv = require("dotenv-webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");


module.exports = {
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
        use: [
          {loader: "ts-loader"}
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"}
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|ttf)$/i,
        loader: "file-loader"
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
      filename: "index.html",
      favicon: "./src/assets/images/favicon.svg"
    }),
    new Dotenv(),
    new ManifestPlugin(),
  ],
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, 'src')],
    extensions: [".tsx", ".ts", ".js"],
    plugins:[
      new TsconfigPathsPlugin({ configFile: "tsconfig.json" })
    ]
  },
};
