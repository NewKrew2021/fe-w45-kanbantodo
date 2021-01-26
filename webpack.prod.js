const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
    plugins: [
      new CleanWebpackPlugin()
    ]
  });