const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DIST_DIR = path.resolve("dist/client");
const CLIENT_DIR = path.resolve("src/client");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.join(CLIENT_DIR, 'index.html'),
    filename: 'index.html',
    inject: 'body'
})
const ExtractTextPluginConfig = new ExtractTextPlugin('styles.bundle.css');

module.exports = {
  entry: {
    app: ['babel-polyfill', path.join(CLIENT_DIR, 'index.js')]
  },
  output: {
    path: DIST_DIR,
    filename: "index.bundle.js"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, ExtractTextPluginConfig]
};