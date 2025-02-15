<!-- <template>
	<view class="wrap">
		<view class="content">
			<view class="topbox">
				<view class="topimg">
					<image src="../../static/eatimg.gif" mode="" class="logo1"></image>
				</view>
			</view>
			<view class="title"></br></br></br></br>英雄不问出处，干饭不问斤数。</view>
			<u-form :model="form" ref="uForm">
				<view class="register1">

				<u-form-item prop="username">
					
					<u-input v-model="form.username" type="text" placeholder="请输入用户名" />
				</u-form-item>
				<u-form-item prop="password">
					<u-input v-model="form.password" type="password" placeholder="请输入密码" />
				</u-form-item>
				<u-form-item prop="pwd2">
					<u-input :scene="form.pwd2" v-model="form.pwd2" type="password" placeholder="请再次输入密码" />
				</u-form-item>
				<u-form-item prop="captcha">
				<uni-captcha :scene="form.scene" v-model="form.captcha"></uni-captcha>
				</u-form-item>
				<button @tap="register" :style="[inputStyle]" class="login-btn">立即注册</button>
				
				</view>
			</u-form>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				username: '',
				password: '',
				pwd2: '',
				scene:'register',
				captcha:''
			}
		}
	},
	onLoad() {
	  
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.form.username&&this.form.password&&this.form.pwd2) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		async register() {
			if (!this.form.username) {
				this.$u.toast('请输入用户名')
				return
			}
			
			if (!this.form.password) {
				this.$u.toast('请输入密码')
				return
			}
			
			if (!this.form.pwd2) {
				this.$u.toast('请再次输入密码')
				return
			}
			
			if (this.form.password !== this.form.pwd2) {
				this.$u.toast('两次输入的密码不一致')
				return
			}
			if (!this.form.captcha) {
				this.$u.toast('请输入验证码')
				return
			}
			let res = await uniCloud.callFunction({
				name:'uni-id-cf',
				data:{
					action:'register',
					params: this.form,
				}
			})
			if (res.result.code === 0) {
				this.$u.toast('注册成功');
				this.$u.route('/pages/login/login');
			} else {
				this.$u.toast(res.result.msg);
			}
		}
		
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;

	.content {
		width: 600rpx;
		margin: 80rpx auto 0;
		.logo1 {
			text-align: center;
			margin: 0 auto;
			height: 30vh;
			width: 100%;
		}
		.register1{
			padding: 0 10% 0 10%;
		}
		.topbox{
			height: 30vh;
		}
		
		.topimg {
			display: flex;
			align-items: center;
		}
		
		.title {
			text-align: center;
			font-size: 36rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.login-btn {
			margin-top: 40rpx;
			background-color: rgb(253, 243, 208);
			color: #FFFFFF;;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}

		}
	}
}
</style -->>
<template>
	<view class="wrap">
		 
		 <view class="topimg">
		 	<image src="../../static/eatimg.gif" mode="" class="logo1"></image>
		 </view>
		 <my-particles />
		<view class="content">
			<u-form :model="form" ref="uForm">
				<view class="title">英雄不问出处，干饭不问斤数。</view>
				<u-form-item prop="username">
					<u-input class="inpu1" v-model="form.username" type="text" placeholder="请输入用户名" />
				</u-form-item>
				<u-form-item prop="password">
					<u-input class="inpu1" v-model="form.password" type="password" placeholder="请输入密码" />
				</u-form-item>
				<u-form-item prop="pwd2">
					<u-input class="inpu1" v-model="form.pwd2" type="password" placeholder="请再次输入密码" />
				</u-form-item>
				<button @tap="register" :style="[inputStyle]" class="login-btn">立即注册</button>
			</u-form>
		</view>
	</view>
</template>

<script>
	import config from '../../common/config.js'
	import MyParticles from '../../components/MyParticles/MyParticles.vue';
export default {
	components: {
	    MyParticles,
	  },
	data() {
		return {
			form: {
				username: '',
				password: '',
				pwd2: '',
				captcha:'',
				scene:'register',
				
			}
		}
	},
	onLoad() {
	  
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.form.username&&this.form.password&&this.form.pwd2) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		
		messageToggle(type) {
			this.msgType = type
			this.messageText = `这是一条${type}消息提示`
			this.$refs.message.open()
		},
		async register() {
			if (!this.form.username) {
				this.$u.toast('请输入用户名')
				return
			}
			
			if (!this.form.password) {
				this.$u.toast('请输入密码')
				return
			}
			
			if (!this.form.pwd2) {
				this.$u.toast('请再次输入密码')
				return
			}
			
			if (this.form.password !== this.form.pwd2) {
				this.$u.toast('两次输入的密码不一致')
				return
			}
			
				uni.request({
							url:config.api+'/user/register',  
							header:{'content-type': 'application/x-www-form-urlencoded'}, //请求的地址，类型为String
							data:{
									username:this.form.username,
									password:this.form.password
								}  ,    //要求为Object或String类型的参数，发送到服务器的数据。如果已经不是字符串，将自动转换为字符串格式。get请求中将附加在url后
								method:'POST',    //get、post、delete
								         //请求头的信息
								success:res=>{
									console.log(res)
									if(res.data.code==1)
									{
									uni.showToast({
										title: "请输入5-16位账号或者密码",
										duration: 2000
									});
									}
									else
									{
										this.$u.toast('注册成功');
											setTimeout(function(){
												uni.navigateTo({
												    url:'../login/login'							  
												});
											},2000)
									}
									}, //请求成功回调，带参数  //请求失败
									})
		}
	}
};
</script>

<style lang="scss" scoped>
	#particles-js {
	  width: 100%;
	  height: calc(100% - 100px);
	  position: absolute;
	}
	.logo1 {
		text-align: center;
		margin: 0 auto;
		height: 30vh;
		width: 70%;
	}
	.inpu1{
		border:2px solid black;
	}
	.topimg {
		display: flex;
		align-items: center;
		margin: 0%;
	}
	
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align:center;
			font-size: 35rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.login-btn {
			margin-top: 40rpx;
			background-color: rgb(253, 243, 208);
			color: #FFFFFF;;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
	}
}
</style>
