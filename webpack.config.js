const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
	mode: 'development',
	entry: './app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
          loader : 'babel-loader'
        }
			},
			{
				test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpg|ico)$/,
				use: [
					'file-loader?name=img/[name].[ext]?[hash]',
					'image-webpack-loader'
			],
			}
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
		 template: './public/index.html'
		}),
		
	],
	devServer: {
		contentBase: './dist',
	}
};
