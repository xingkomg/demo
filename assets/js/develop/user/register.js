import $ from '../../lib/jquery.2.1.4.js';
import _ from '../common/Global.js';

class Start{
	constructor(){
		let _this = this;
		let data = {
			jobNumber : _.GetUrlPara('jobNumber'),
			name : decodeURIComponent(_.GetUrlPara('name')),
			company : _.GetUrlPara('company')
		}
		_.GetTpl({
			url : '/user/register.tpl',
			data : data,
			callback : function(html){
				$('#main').html(html);
				_this.Event();
			}
		})
	}

	Event(){
		this.SendCode();
		this.Submit();
	}

	SendCode(){
		$('.send-code').on('click',function(){
			let here = this;

            if( $(here).hasClass('disable') ){
                return false;
            }

			let mobile = $('.mobile').val();

			if( !_.RegCheck.Tel(mobile) ){
				_.Popup.Tip('请填写正确的手机号');
				return false;
			}

			$(here).addClass('disable');

			_.Ajax({
				devName : 'DR',
				url : '/common/verifycode',
				type : 'get',
				dataType : 'json',
				data : {
					tel : mobile,
					type : '1'
				},
				success : function(res){
					if( res.returnCode == '0000' ){
						console.log('发送成功');
					}
				},
				fail : function(){}
			});

            _.TimeDown(60,function(t){
                $(here).text(t+'秒');
            },function(){
                $(here).removeClass('disable');
                $(here).text('获取验证码');
            })
		})
	}

	Submit(){
		$('.btn').on('click',function(){
			let mobile = $('.mobile').val(),
				code = $('.code').val(),
				password = $('.password').val(),
				repassword = $('.password-repeat').val(),
				jobNumber;
			if( $('.jobNumber').size() ){
				jobNumber = $('.jobNumber').val();
			}else{
				jobNumber = _.GetUrlPara('jobNumber');
			}

			if( !_.RegCheck.Tel(mobile) ){
				_.Popup.Tip('请填写正确的手机号码');
	            return false;
	        }

	        if( !_.RegCheck.Code(code) ){
				_.Popup.Tip('请填写正确的验证码');
	            return false;
	        }

	        if( !_.RegCheck.Password(password) || !_.RegCheck.Password(repassword) ){
				_.Popup.Tip('请填写正确的密码');
	            return false;
	        }

	        if( password != repassword ){
				_.Popup.Tip('密码不一致');
	            return false;
	        }

	        if( !jobNumber ){
	        	_.Popup.Tip('请填写推荐人工号');
	            return false;
	        }

			_.Ajax({
				url : '/user/reg',
				type : 'get',
				dataType : 'json',
				devName : 'DR',
				data : {
					username : mobile,
		            verifyCode : code,
		            pwd : password,
		            rePwd : repassword,
		            jobNumber : jobNumber,
		            flags : 0,
		            channel : 2
				},
				success : function(res){
					if( res.returnCode == '0000' ){
						window.location.hash = '/user/certify';
					}else{
						_.Popup.Tip(res.returnMsg);
					}
				}
			})
		})
	}
}

export default Start;