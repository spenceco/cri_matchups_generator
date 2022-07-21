const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: { presets: ["@babel/env"] }
			},
			{
				test: /\.css$/,
				use: ["style-loader","css-loader"]
			}
		]
	},
	resolve: { extensions: ['*', '.js', '.jsx']},
	output: {
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '/dist/',
		filename: 'bundle.js'
	},
	devServer: {
		static: {
	      directory: path.resolve(__dirname, "public"),
	      //staticOptions: {},
	      // Don't be confused with `devMiddleware.publicPath`, it is `publicPath` for static directory
	      // Can be:
	      // publicPath: ['/static-public-path-one/', '/static-public-path-two/'],
	      //publicPath: "/static-public-path/",
	      // Can be:
	      // serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
	      //serveIndex: true,
	      // Can be:
	      // watch: {} (options for the `watch` option you can find https://github.com/paulmillr/chokidar)
	      //watch: true,
	    },
	    //disableHostCheck: true,
		port: 3000,
		allowedHosts: "all",
		devMiddleware: {
			publicPath: 'http://localhost:3000/dist/'
		},
		hot: 'only',
		historyApiFallback: true,
		proxy:{
			'/api': {
				target: 'http://localhost:8000'
			}
		}
	},
//		plugins: [new webpack.HotModuleReplacementPlugin()]

};