/*
*	单页面开发自定义路由公用组件
*	author : zhupinglei
*	email : 344184416@qq.com
*/

class Routes{
	constructor(obj){
		let _this = this;
		_this.obj = obj;
		_this.obj.beforeLoad(function(){
			_this.Lisener();
			window.onhashchange = function(){
				_this.Lisener();
			}
		});
	}
	Page(){
		let _this = this;
		let r = [];
		for(let i = 0; i < _this.obj.routes.length; i++){
			r.push({
				tpl : require('../develop' + _this.obj.routes[i].file),
				route : _this.obj.routes[i].route,
				title : _this.obj.routes[i].title
			})
		}
		return r;
	}
	Lisener(){
		let _this = this;
		let route = window.location.hash.split('?')[0].replace('#',''),
			Page = _this.Page(),
			flag = 0;

		for(let i = 0; i < Page.length; i++){
			if( !route || route == '/' ){
				window.location.hash = _this.obj.indexPage;
				break;
			}
			if( route == Page[i].route && flag == 0 ){
				flag = 1;
				document.title = Page[i].title;
				_this.obj.pageInit(function(){
					new Page[i].tpl.default();
				});
				break;
			}
		}

		if( flag == 0 ){
			document.title = '404';
			_this.obj.notFound();
		}
	}
}

export default Routes;