const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: "./app.ts",
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    resolve: {
        fallback: {
            fs: false,
            buffer: false,
            net: false,
            crypto: false,
            https: false,
            http: false,
            vm: false,
            os: false,
            constants: false,
            zlib: false,
            assert: false,
        },
        extensions: ['.ts', '.js']
    },
    devServer: {
        contentBase: __dirname + "/dist/",
        inline: true,
        hot: true,
        host: "localhost",
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                "style-loader",
                "css-loader",
                "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg)$/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css", "scss"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
}

