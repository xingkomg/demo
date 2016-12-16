import $ from './jquery.2.1.4.js';

export default {
	Tip : function(content){
		let str = '<div id="popup"><div id="popup-mask"></div><div id="popup-tip">'+content+'</div></div>';
		let $html = $(str).appendTo('body');

		let t = setInterval(function(){
			$html.fadeOut(function(){
				$html.remove();
				clearInterval(t);
			});
		},1000);
	},
	Loading : function(){
		let str = '<div id="loading"><div id="popup-mask"></div><div id="popup-loading"></div></div>';
		let $html = $(str).appendTo('body');
	},
	LoadingRemove : function(){
		$('#loading').remove();
	}
}