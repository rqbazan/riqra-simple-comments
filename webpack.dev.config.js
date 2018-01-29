const path = require('path');
const webpack = require("webpack");
const baseConfig = require("./webpack.base.config.js");

const CLIENT_DIR = path.resolve("src/client");

baseConfig.entry = ["babel-polyfill", "webpack-hot-middleware/client", path.join(CLIENT_DIR, "index.js")];

baseConfig.output.publicPath = '/';

baseConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(), 
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.EnvironmentPlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  })
);

module.exports = baseConfig;