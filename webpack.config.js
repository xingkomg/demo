var webpack = require('webpack'),
	ExtractTextPlugin = require("extract-text-webpack-plugin");

var Path = {
	Js : {
		Dev : __dirname + '/assets/js/develop/',
		Build : __dirname + '/assets/js/build/'
	},
	Css : __dirname + '/assets/css/',
	Img : __dirname + '/assets/img/'
}

module.exports = {
	entry : {
		index : Path.Js.Dev + 'index.js'
	},
	output: {
		filename: Path.Js.Build + '[name].build.js'
	},
	module: {
		loaders: [
			{ 
				test: /\.less$/, 
				loader: ExtractTextPlugin.extract('style-loader','css-loader!less-loader')
			},
			{ test: /\.html$/, loader: 'html' },
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			}
		]
	},
	// 配置babel转化成es5的语法
	babel: {
		presets: ['es2015'],
		plugins: ['transform-runtime']
	},
	plugins: [
    	// 用于提取 !"多个入口文件"! 的公共部分
		// new webpack.optimize.CommonsChunkPlugin( Path.Js.Build + 'common.build.js' ),
		// css文件独立插件
		new ExtractTextPlugin( Path.Css + '[name].css', {
			allChunks: true,
		})
	]
}