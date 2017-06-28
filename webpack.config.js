const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, 'client/dist');
const APP_DIR = path.resolve(__dirname, 'client');

module.exports = {
  entry: APP_DIR,
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {test: /\.scss$/,
       use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ["css-loader", "sass-loader"]})
      }]
  },
    output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ],
    devServer: {
      historyApiFallback: true
    }
};
