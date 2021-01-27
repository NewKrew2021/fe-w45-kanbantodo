const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './webpack-entry.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'script.bundle.js'
  },
  module: {
    rules: [
      // rule for .ts and .js
      {
        test: /\.(js|ts)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'ts-loader' }
        ]
      },

      // rule for .sass, .scss and .css
      {
        test: /\.s[ac]ss$/i,
        use: [
          // extracts CSS into separate files
          MiniCssExtractPlugin.loader,
          // inject CSS into the DOM
          // { loader: 'style-loader' },
          // interprets @import and url() like import/require() and will resolve them
          {
            loader: 'css-loader',
            options: {
              modules: { // enable CSS modules and their configuration
              localIdentName:'[local]'
              }
            }
          },
          // loads a Sass/SCSS file and compiles it to CSS
          { loader: 'sass-loader' }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/index.html'
    }),
    new MiniCssExtractPlugin()
  ],
  mode: 'development'
};