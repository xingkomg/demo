import $ from '../../lib/jquery.2.1.4.js';
import _ from '../common/Global.js';

class Start{
	constructor(){
		_.GetTpl({
			url : '/about/home.tpl',
			data : {},
			callback : function(html){
				$('#main').html(html);
			}
		})
	}
}

export default Start;