import '../../less/index.less';
import $ from '../lib/jquery.2.1.4.js';
import _ from './common/Global.js';
import Layout from './common/Layout.js';
import Routes from '../routes/routes.js';

class Index{
	routes(){
		return [
			{
				file : '/home/home.js',
				route : '/index',
				title : '首页'
			},
			{
				file : '/rz/home.js',
				route : '/rz',
				title : '票据融资'
			},
			{
				file : '/cg/home.js',
				route : '/cg',
				title : '票据存管'
			},
			{
				file : '/zf/home.js',
				route : '/zf',
				title : '票据支付'
			},
			{
				file : '/about/home.js',
				route : '/about',
				title : '关于我们'
			},
			{
				file : '/user/register.js',
				route : '/user/register',
				title : '用户注册'
			},
			{
				file : '/user/certify.js',
				route : '/user/certify',
				title : '用户认证'
			}
		]
	}

	constructor(){
		let _this = this;

		new Routes({
			routes : _this.routes(),
			beforeLoad : function(loaded){
				loaded();
			},
			indexPage : '/index',
			pageInit : function(initEnd){
				$('#app').html('');
				$(window).scrollTop(0);
				new Layout({
					tpl : '/layout.tpl',
					el : '#app',
					box : '#layout',
					data : {},
					callback : function(){
						initEnd();
						_this.nav();
						$(window).on('hashchange',function(){
							_this.nav();
						})
					}
				})
			},
			notFound : function(){
				$('#app').html('页面未找到');
			}
		})
	}

	nav(){
		let route = window.location.hash.split('?')[0].split('/')[1];
		let $item = $('#nav a.'+route);
		$('#nav a.active').removeClass('active');
		if( $item.size() ){
			$item.addClass('active');
		}
	}
}

new Index();