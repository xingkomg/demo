import $ from '../../lib/jquery.2.1.4.js';
import _ from './Global.js';

class Layout{
	constructor(obj){
		this.obj = $.extend({
			tpl : '/layout.tpl',	//模板
			el : 'body',	//挂载点
			box : '#layout',	//子模块盒子
			data : {},
			callback : function(){}
		},obj);
		if( !$(this.obj.box).size() ){
			this.start();
		}else{
			this.obj.callback();
		}
	}
	start(){
		let _this = this;
		
		_.GetTpl({
			url : _this.obj.tpl,
			data : _this.obj.data,
			callback : function(html){
				let boxid = _this.obj.box.replace('#','');
				let str = '<div id="'+boxid+'">'+html+'</div>';
				$(_this.obj.el).html(str);
				_this.obj.callback();
			}
		})
	}
}

export default Layout;