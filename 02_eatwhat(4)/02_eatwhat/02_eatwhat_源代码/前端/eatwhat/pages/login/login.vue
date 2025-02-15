<!-- <template>
	<view class="wrap">
     <vue-particles
              color="#409EFF"
              :particleOpacity="0.7"
              :particlesNumber="60"
              shapeType="circle"
              :particleSize="6"
              linesColor="#409EFF"
              :linesWidth="1"
              :lineLinked="true"
              :lineOpacity="0.4"
              :linesDistance="150"
              :moveSpeed="3"
              :hoverEffect="true"
              hoverMode="grab"
              :clickEffect="true"
              clickMode="push">
    </vue-particles>

		<view class="content">
		<view class="topbox">
			<view class="topimg">
				<image src="../../static/eatimg.gif" mode="" class="logo1"></image>
			</view>
		</view>
		<view class="title"></br></br></br></br>英雄不问出处，干饭不问斤数。</view>
		<view class="login1">
			<u-form :model="form" ref="uForm">
					<u-form-item class="in1" prop="username">
						<u-input v-model="form.username" type="text" placeholder="请输入用户名" />
					</u-form-item>
					<u-form-item class="in1" prop="password">
						<u-input v-model="form.password" type="password" placeholder="请输入密码" />
					</u-form-item>
					<u-form-item prop="captcha">
						<uni-captcha :scene="form.scene" v-model="form.captcha"></uni-captcha>
					</u-form-item>
					<button @tap="login" :style="[inputStyle]" class="login-btn">登录</button>
					<view class="register-text" @tap="toRegister">还没有账号，立即注册</view>
			</u-form>
		</view>
			
		</view>
	</view>
</template>

<script>
	import MyParticles from '../../components/MyParticles/MyParticles.vue';
	import {setToken} from '../../unil/auth';
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
					scene: 'login',
					captcha: ''
				}
			}
		},
		onLoad() {

		},
		computed: {

			inputStyle() {
				let style = {};
				if (this.form.username && this.form.password) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {

			async login() {

				if (!this.form.username) {
					this.$u.toast('请输入用户名')
					console.log('enter component')
					return
				}

				if (!this.form.password) {
					this.$u.toast('请输入密码')
					return
				}
				if (!this.form.captcha) {
					this.$u.toast('请输入验证码')
					return
				}
				let res = await uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'login',
						params: this.form,
					}
				})
				if (res.result.code === 0) {
					this.$u.toast('登陆成功');
					setToken('111111');
					uni.reLaunch({
					      url: '/pages/index/index'
					    });
				} else {
					this.$u.toast(res.result.msg);
				}
			},
			toRegister() {
				this.$u.route('/pages/register/register');
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
	.in1{
		border:1px solid grey;
		margin: 5px;
	}
	.wrap {
		font-size: 28rpx;

		.content {
			.logo1 {
				text-align: center;
				margin: 0 auto;
				height: 30vh;
				width: 70%;
			}
			.login1{
				padding: 0 10% 0 10%;
			}
			.topbox{
				height: 15vh;
			}
			
			.topimg {
				display: flex;
				align-items: center;
				margin: 0%;
			}

			.title {
				text-align: center;
				font-size: 2px;
				font-weight: 500;
				margin-bottom: 50rpx;
				margin-top: 50rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.login-btn {
				margin-top: 40rpx;
				background-color: rgb(253, 243, 208);
				color: #FFFFFF;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.register-text {
				padding: 20rpx 0;
				text-align: right;
				color: $u-type-primary;
			}
		}


		// .img1{
		// 	position: fixed;
		// 	height: 600rpx;
		// 	width: 150rpx;
		// }
	}
</style> -->
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
				<button @tap="login" :style="[inputStyle]" class="login-btn">登录</button>
				<button class="login-btn1" @tap="toRegister">还没有账号，立即注册</button>
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
					scene: 'login',
					captcha: '',

				}
			}
		},
		onLoad() {

		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.form.username && this.form.password) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			async login() {
				if (!this.form.username) {
					this.$u.toast('请输入用户名')
					return
				}

				if (!this.form.password) {
					this.$u.toast('请输入密码')
					return
				}

				uni.request({
					url: config.api+'/user/login',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					}, //请求的地址，类型为String
					data: {
						username: this.form.username,
						password: this.form.password
					}, //要求为Object或String类型的参数，发送到服务器的数据。如果已经不是字符串，将自动转换为字符串格式。get请求中将附加在url后
					method: 'POST', //get、post、delete
					//请求头的信息
					success: res => {
						console.log(res),
							uni.setStorageSync('token', res.data.data)
						if (res.data.code == '1') {
							this.$u.toast(res.data.message);
						} else {
							this.$u.toast('登陆成功');
							uni.setStorageSync('token', res.data.data),
								getApp().globalData.yhdl = false;
							getApp().globalData.yhm = this.form.username;
							uni.request({
								url: config.api+'/user/userInfo',
								header: {
									"Authorization": uni.getStorageSync('token')
								}, //请求的地址，类型为String
								method: 'GET', //get、post、delete
								//请求头的信息
								success: res => {
									console.log(res)
									getApp().globalData.nc = res.data.data.nickname
									getApp().globalData.tx = res.data.data.userPic
									console.log(getApp().globalData.tx)
									getApp().globalData.id = res.data.data.id
									console.log(getApp().globalData.id)
								}, //请求成功回调，带参数  //请求失败

							});
							console.log(getApp().globalData.yhm)
							setTimeout(function() {
								uni.reLaunch({
									url: '/pages/index/index',
								});
							}, 2000)
						}
					}, //请求成功回调，带参数  //请求失败
				})
			},
			toRegister() {
				this.$u.route('/pages/register/register');
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

	.topimg {
		display: flex;
		align-items: center;
		margin: 0%;
	}

	.inpu1 {
		border: 1px solid red;
	}

	.logo1 {
		text-align: center;
		margin: 0 auto;
		height: 30vh;
		width: 70%;
	}

	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: center;
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
				color: #FFFFFF;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.login-btn1 {
				margin-top: 40rpx;
				background-color: rgb(253, 178, 73);
				color: #000000;
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