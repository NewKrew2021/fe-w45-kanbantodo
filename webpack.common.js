const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./client/src/app.js", // 엔트리 포인트
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['css-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                  loader : 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/todo.html'
        }),
        new copyWebpackPlugin({
            patterns: [
                {
                    from: "./client/stylesheets",
                    to: "stylesheets"
                },{
                    from: "./client/images",
                    to: "images"
                },{
                    from: "./client/models",
                    to: "models"
                },{
                    from: "./client/src",
                    to: "src"
                },{
                    from: "./client/views",
                    to: "views"
                }
            ],
        })
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    }
}