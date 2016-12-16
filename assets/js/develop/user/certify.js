import $ from '../../lib/jquery.2.1.4.js';
import _ from '../common/Global.js';
import Base64 from '../../lib/imgbase64.js';

class Start{
	constructor(){
		let _this = this;
		_.GetTpl({
			url : '/user/certify.tpl',
			data : {},
			callback : function(html){
				$('#main').html(html);
				_this.Event();
			}
		})
	}
	Event(){
		$('#user-certify .upload').on('click',function(){
			let $input = $(this).next();
			$input.click();
		})

		$('#user-certify input[type=file]').on('change',function(){
			let $img = $(this).next();
			Base64(this,300000,function(res){
				$img.attr('src',res);
			})
		})

		this.Submit();
	}

	Submit(){
		$('.btn').on('click',function(){
			let company = $('.company').val(),
				name = $('.name').val(),
				idcard = $('.idcard').val(),
				address = $('.address').val(),
				companyno = $('.company-no').val(),
				img = $('.upload-img').attr('src');

			if( !company ){
				_.Popup.Tip('请填写企业名称');
				return false;
			}

			if( !name ){
				_.Popup.Tip('请填写法人姓名');
				return false;
			}

			if( !idcard ){
				_.Popup.Tip('请填写法人身份证');
				return false;
			}

			if( !address ){
				_.Popup.Tip('请填写业务所在地');
				return false;
			}

			if( !companyno ){
				_.Popup.Tip('请填写营业执照号');
				return false;
			}

			if( !img ){
				_.Popup.Tip('请上传营业执照');
				return false;
			}

			_.Ajax({
				devName : 'HB',
				url : '/cust/identification',
				type : 'post',
				dataType : 'json',
				data : {
					custName : company,
					legalPerson : name,
					lpCode : idcard,
					businessAddr : address,
					buLicense : companyno,
					img : img
				},
				success : function(res){
					if( res.returnCode == '0000' ){
						_.Popup.Tip(res.returnMsg);
						window.location.hash = '/index';
					}else{
						_.Popup.Tip(res.returnMsg);
					}
				}
			})
		})
	}
}

export default Start;