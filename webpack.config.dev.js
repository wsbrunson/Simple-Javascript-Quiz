var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'cheap-eval-source-map',

	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/dev-server',
		'./src/js/main'
	],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],

	module: {
		loaders: [{
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass']
		}, {
			test: /\.js$/,
			exclude: /node_modules\/(?!(stardust))/,
			loader: 'babel',
			query: {
				cacheDirectory: true,
				plugins: [
					'transform-decorators-legacy'
				],
				presets: ['es2015', 'react', 'stage-2']
			}
		}]
	},

	devServer: {
		contentBase: './dist',
		// hot: true,
		historyApiFallback: true
	}
};
