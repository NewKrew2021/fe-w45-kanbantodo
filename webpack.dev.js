const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: __dirname + "/dist/",
        hot: true,
        host: "localhost",
        port: 9000
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
});