var path = require('path')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: [
	    'webpack-dev-server/client?http://localhost:8080',
	    'webpack/hot/only-dev-server',
		path.join( __dirname, '/src/main.jsx')
	],
	output: {
		path: path.join( __dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['','.js','.jsx']
	},
	plugins: [
		new ExtractTextWebpackPlugin("style.css"),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body',
			filename: 'index.html'
		})
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/, // .js .jsx
				loaders: ['babel'],
				include: path.join(__dirname, 'src')
			},
			// {
			// 	test: /\.scss$/,
			// 	loader: ExtractTextWebpackPlugin.extract("style-loader", "css-loader", "sass-loader")
			// },
			{
				test: /\.css$/,
				loader: ExtractTextWebpackPlugin.extract("style-loader", "css-loader")
			},
		    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
		    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }

		]
	}
}