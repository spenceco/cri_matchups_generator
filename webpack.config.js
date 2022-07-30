const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/front-end/index.js',
	mode: 'development',
	module: {
		rules: [
		  {
		    test: /\.js$/,
		    enforce: 'pre',
		    use: ['source-map-loader'],
		  },
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
	    
	    allowedHosts: ['dev.spence.codes','spence.codes'],
	    //disableHostCheck: true,
		port: 3000,
		allowedHosts: "all",
		host: "0.0.0.0",
		devMiddleware: {
			publicPath: 'http://localhost:3000/dist/'
		},
		hot: 'only',
		historyApiFallback: true,
		proxy:{
			'/api': {
				target: 'http://localhost:8080'
			},
			'/auth': {
				target: 'http://localhost:8080'
			},


		},
		client: {
			webSocketURL: 'auto://0.0.0.0:0/ws',
		}
	},
//		plugins: [new webpack.HotModuleReplacementPlugin()]

};