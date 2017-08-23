const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [path.resolve(__dirname, 'client/index.js'), path.resolve(__dirname, 'client/src/public/css/style.scss')],
  output: {
    path: path.resolve(__dirname, 'client/src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader?importLoaders=1' })
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(jpg|png|gif|svg)$/i,
        loaders: [
          'file-loader?name=/public/image/[name].[ext]',
          'image-webpack-loader'
        ]
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ],
  devServer: {
    historyApiFallback: true
  }
};
