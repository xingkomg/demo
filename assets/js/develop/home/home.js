import $ from '../../lib/jquery.2.1.4.js';
import _ from '../common/Global.js';
import Swiper from '../../lib/swiper.3.4.0.js';

class Start{
	constructor(){
		let _this = this;
		_.GetTpl({
			url : '/home/home.tpl',
			data : {},
			callback : function(html){
				$('#main').html(html);
				_this.Event();
			}
		})
	}

	Event(){
		new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',   //索引class
            paginationClickable: true,  //索引小圆点是否可点
            loop : true,    //loop模式,你能够无限滑动滑块，到最后一个之后会跳转回第一个
            autoplay : 3000 //自动播放
        });

        let w = $(window).width();
        $('#banner').height(w*0.5);
	}
}

export default Start;