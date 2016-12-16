import $ from '../../lib/jquery.2.1.4.js';
import template from '../../lib/template.js';
import Config from './Config.js';

class GetTpl{
	constructor(obj){
		let flag = 0, CacheHtml = '';
		for(let i = 0; i < Config.TplCache.length; i++){
			if( Config.TplCache[i].url == obj.url && flag == 0 ){
				flag = 1;
				CacheHtml = Config.TplCache[i].render(obj.data);
				break;
			}
		}
		if( flag == 1 ){
			obj.callback(CacheHtml);
			return false;
		}
		$.get('/views' + obj.url,function(res){
			let render = template.compile(res),
				html = render(obj.data);
			Config.TplCache.push({
				url : obj.url,
				render : render
			})
			obj.callback(html);
		})
	}
}

export default GetTpl;