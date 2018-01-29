const webpack = require("webpack");
const baseConfig = require("./webpack.base.config.js");

baseConfig.devtool = "cheap-module-source-map";

baseConfig.plugins.push(
  new webpack.EnvironmentPlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  })
);


module.exports = baseConfig;