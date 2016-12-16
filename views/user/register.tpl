<div id="user-register">
	{ if company == 1 }
	<div class="baiwang">
		<img src="./assets/img/user/register/baiwang.png" />
	</div>
	{ else }
	<div class="own">
		<img src="./assets/img/user/register/logo-2.png" />
	</div>
	{ /if }
	<div class="form">
		<div class="item">
			<input class="mobile" type="text" value="" placeholder="手机号" />
		</div>
		<div class="item">
			<input class="code" type="text" value="" placeholder="验证码" />
			<span class="send-code">获取验证码</span>
		</div>
		<div class="item">
			<input class="password" type="password" value="" placeholder="登录密码" />
		</div>
		<div class="item">
			<input class="password-repeat" type="password" value="" placeholder="确认密码" />
		</div>
		{ if name }
		<div class="item">
			<span class="recommend">推荐人：{ name }</span>
		</div>
		{ else }
		<div class="item">
			<input class="jobNumber" type="text" value="" placeholder="推荐人工号" />
		</div>
		{ /if }
	</div>
	<div class="btn">
		<button>注 册</button>
	</div>
</div>