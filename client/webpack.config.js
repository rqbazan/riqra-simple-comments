const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
})

const ExtractTextPluginConfig = new ExtractTextPlugin('style.bundle.css');

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/index.js']
    },
    output: {
        path: path.resolve(__dirname, '../build/client'),
        filename: 'index.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                use: 'css-loader'
            })            
        }]
    },
    plugins: [HtmlWebpackPluginConfig, ExtractTextPluginConfig]
};