import $ from '../../lib/jquery.2.1.4.js';
import Config from './Config.js';
import GetTpl from './GetTpl.js';
import Popup from '../../lib/popup.js';

export default {
	Popup : Popup,
	RegCheck : {
		Default : function(reg,str){
			return reg.test(str);
		},
		Username : function(str){
			var reg = /^[_A-Za-z0-9]{6,16}$/;
			return reg.test(str);
		},
		Password : function(str){
			var reg = /^[\w~!@#$%^&*()_+{}:"<>?\-=[\];\',.\/A-Za-z0-9]{6,16}$/;
			return reg.test(str);
		},
		Email : function(str){
			var reg = /^([a-zA-Z0-9]|[._])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
			return reg.test(str);
		},
		Tel : function(str){
			var reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
			return reg.test(str);
		},
		Code : function(str){
			var reg = /^\d{6}|\d{4}$/;
			return reg.test(str);
		},
		CN : function(str){
			var reg = /^[\u4E00-\u9FA5]+$/;
			return reg.test(str);
		},
		Card : function(str){
			var reg = /^(\d){16,19}$/;
			return reg.test(str);
		}
	},
	GetTpl : function(obj){
		new GetTpl({
			url : obj.url,
			data : obj.data,
			callback : obj.callback
		});
	},
	Ajax : function(obj){
		let Api = this.GetApi(obj.devName);
		Popup.Loading();
		$.ajax({
			url : Api + obj.url,
			type : obj.type,
			dataType : obj.dataType,
			data : obj.data
		}).done(function(res){
			let t = setTimeout(function(){
				Popup.LoadingRemove();
				obj.success(res);
				clearTimeout(t);
			},500)
		}).fail(function(jqXHR, textStatus, errorThrown){
			console.log('出错接口:',obj.url);
		})
	},
	GetUrlPara : function(key){
		let para = window.location.hash.split('?')[1]
		
		if( para ){
			let arr;
			if( window.location.search.indexOf('&&') > -1 ){
				arr = para.split('&&');
			}else{
				arr = para.split('&');
			}
			let len = arr.length,
				obj = {};
			for(let i = 0; i < len; i++){
				let v = arr[i].split('='),
					k = v[0],
					value = v[1] ? v[1] : '';
				obj[k] = value;
			}
			if( !key ){	//无key值，取全部
				return obj;
			}else{	//有key值，取key值对应值
				return obj[key];
			}
		}else{
			return '';
		}
	},
	GetApi : function(devName){
		let Api = '';
		let hostname = window.location.hostname;
		switch(hostname){
			// 本地开发
			case 'm.qingzhongfu.local':
			case 'm.qingzhongfu.test':
				if( Config.Api.Mode == 0 ){
					Api = Config.Api[devName];
				}else{
					Api = Config.Api.Test;
				}
				break;
			// 本地测试服务器
			case 'm.qingzhongfu.test':
				Api = Config.Api.Test;
				break;
			// 其他
			default:
				Api = Config.Api.Test;
				break;
		}
		return Api;
	},
	TimeDown : function(time,each,call){
		let date = new Date(),
			StartTime = date.getTime();

		let t = setInterval(function(){
			let date = new Date(),
				ThisTime = date.getTime();
			let desc = ThisTime - StartTime;

			let showTime = time - parseInt(desc/1000);

			if( typeof each == 'function' ){
				each(showTime);
			}
			if( showTime <= 0 ){
				clearInterval(t);
				if( typeof call == 'function' ){
					call();
				}
			}
		},1000);
	}
}