module.exports = {
  entry: './src/js/app/app.js',
  output: {
    path: './build/js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
			{
				test: /\.js$/,
				loader: 'babel?presets[]=es2015'
			}
		]
	}
};
