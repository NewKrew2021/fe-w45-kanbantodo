const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: "./client/src/app.ts", // 엔트리 포인트
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
    resolve: {
        modules: ["node_modules"],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
        alias: {
            "client": path.resolve(__dirname, "client")
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            FETCH_URL: JSON.stringify("http://localhost:5000"),
            ADD_CARD_URL: JSON.stringify("http://localhost:5000/addCard"),
            ADD_LIST_URL: JSON.stringify("http://localhost:5000/addlist"),
            EDIT_URL: JSON.stringify("http://localhost:5000/list/edit"),
            REMOVE_URL: JSON.stringify("http://localhost:5000/list/remove"),
            ADD_HISTORY_URL: JSON.stringify("http://localhost:5000/addHistory"),
            GET_HISTORY_URL: JSON.stringify("http://localhost:5000/getHistory"),
            GET_ALL_DATA_URL : JSON.stringify("http://localhost:5000/posts")
        }),
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