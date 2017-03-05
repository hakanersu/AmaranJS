var webpack = require('webpack');
var path = require('path');
var inProduction = (process.env.NODE_ENV === 'production');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		amaran: [
			'./src/amaran.js',
			'./src/scss/amaran.scss'
		],
	},
	output: {
		path: path.resolve(__dirname, './dist'), 
		// name setted at entry point
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}, 
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new webpack.LoaderOptionsPlugin({
			minimize: inProduction
		})
	]
};

if (inProduction) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);
}