const path = require("path");
const outputDir = path.resolve(__dirname, "build");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: outputDir,
    filename: "bundle.js",
    publicPath: "/",
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
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader"
      },
    ],
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, 'src')],
    extensions: [".tsx", ".ts", ".js"],
    plugins:[
      new TsconfigPathsPlugin({ configFile: "tsconfig.json" })
    ]
  },
};
