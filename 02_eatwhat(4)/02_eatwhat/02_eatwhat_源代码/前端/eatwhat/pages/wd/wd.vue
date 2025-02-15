<template>
	<view id="grad1">

	<view class="box1">
		<view class="box-bg">
			<!-- #ifdef MP-WEIXIN||APP||APP-PLUS -->
			<uni-nav-bar shadow left-icon="arrow-left" leftText="返回" @clickLeft="fh()" style="margin-top:30px;"
				title="我的" />
			<!--  #endif -->
			<!-- #ifdef H5 -->
			<uni-nav-bar shadow left-icon="arrow-left" leftText="返回" @clickLeft="fh()" title="我的" />

			<!--  #endif -->
		</view>
		<my-particles />
		<view class="tx">
			<u-avatar :src="this.tx1" mode="circle" class="tx1"  size="300" @click="uploadAvatarImg"></u-avatar>
		</view>
		<view class="nc">
			<text class="nc1">昵称:</text>
			<input class="in1" type="text" :placeholder="this.nc" v-model="nc" />
			<u-button :ripple="true" shape="circle" type="error" size="medium" plain ripple-bg-color="rgba(255, 0, 4, 0.1)" class="bu1" @click="mc()" hover-class="bu11"><text class="bu1.1">确认修改</text></u-button>
		</view>
		<view class="nc">
			<text class="nc1">
				初始密码:
			</text>
			<input class="in1" type="password" placeholder="请输入密码" v-model="password" />
		</view>
		<view class="nc">
			<text class="nc1">
				新密码:
			</text>
			<input class="in1" type="password" placeholder="请输入新密码" v-model="password1" />
		</view>
		<view class="nc">
			<text class="nc1">
				确认密码:
			</text>
			<input class="in1" type="password" placeholder="请输入新密码" v-model="password2" />
		</view>
		<view>
			<u-button :ripple="true" shape="circle" type="error" size="default" plain ripple-bg-color="rgba(255, 0, 4, 0.1)" class="nihao" @click="nihao1" hover-class="bu11">修改密码</u-button>
		</view>

	</view>
	</view>
</template>
<script>
	import MyParticles from '../../components/MyParticles/MyParticles.vue';
	import config from '../../common/config.js'
	export default {
		components: {
			MyParticles,
		},
		onLoad() {
			if (getApp().globalData.tx) {
				this.tx1 = getApp().globalData.tx
			} else {
				this.tx1 = "/static/tj.png"
			}
			this.nc = getApp().globalData.nc
		},
		data() {
			return {
				tx1: "",
				name: "",
				password: "",
				password1: "",
				password2: "",
				nc: ''
			}
		},
		computed: {

		},
		methods: {
			uploadAvatarImg() {
				uni.chooseImage({
					count: 1, //上传数量 默认为 9

					success: (res) => {
						this.tempPicUrl = res.tempFilePaths[0]
						console.log(this.tempPicUrl)
						uni.uploadFile({
							url: config.api +'/upload', // 对应后端接口的完整地址
							filePath: this.tempPicUrl, // 图片的临时路径
							name: "file", // 服务器定义的文件字段为 file
							header: { // 配置请求头信息 => jwt 校验
								//设置用户访问的token信息
								"Authorization": uni.getStorageSync('token')
							},
							success: (res) => {
								console.log('上传成功', res)
								console.log(res) //  后端返回的 data 是字符串
								let data = JSON.parse(res.data)
								console.log(data)
								this.avatarPicUrl = data.data
								getApp().globalData.tx = data.data
								this.tx1 = data.data
								uni.request({
									url: config.api+'/user/updateAvatar' +
										'?' + "avatarUrl=" + this.tx1,
									header: {
										"Authorization": uni.getStorageSync('token')
									}, //请求的地址，类型为String
									method: 'PATCH',
									success: res => {
										uni.showToast({
											title: "更新成功",
											duration: 2000
										});
										console.log(res)

									}, //请求成功回调，带参数  //请求失败

								})
								this.modifyUserInfoAfterUpload(this.avatarPicUrl, this.userId)
								// 上传成功后使用 vuex 保存，但不做持久处理
								this.$store.commit('user_info/UpdateUserAvatarPic', this
									.avatarPicUrl)

							},
							fail: (error) => {
								uni.showToast({
									title: "上传失败，文件最大为500k",
									duration: 2000
								});
								console.log('上传失败', error)
								console.log(this.tempPicUrl)
							}
						})
					}
				})
			},
			fh() {
				console.log(getApp().globalData.nc)
				uni.switchTab({

					url: '/pages/user/user'
				});
			},
			nihao1() {
				if (this.password && this.password1 && this.password2) {

					uni.request({
						url: config.api+'/user/updatePwd',
						header: {
							"Authorization": uni.getStorageSync('token')
						}, //请求的地址，类型为String
						method: 'PATCH',
						data: {
							old_pwd: this.password,
							new_pwd: this.password1,
							re_pwd: this.password2,
						},
						//请求头的信息
						success: res => {
							console.log(res)
							if (res.data.code == 1) {
								uni.showToast({
									title: res.data.message,
									duration: 2000
								});
							} else {
								uni.showToast({
									title: "修改成功",
									duration: 2000
								});
								this.password = ""
								this.password1 = ""
								this.password2 = ""
							}
						}, //请求成功回调，带参数  //请求失败

					});
				} else {
					this.$u.toast('请输入密码')
				}
			},
			mc() {
				if (this.nc) {
					uni.request({
						url: config.api+'/user/update',
						header: {
							"Authorization": uni.getStorageSync('token')
						}, //请求的地址，类型为String
						method: 'PUT',
						data: {
							id: getApp().globalData.id,
							nickname: this.nc,
						},
						//请求头的信息
						success: res => {
							if (res.data.code == 1) {
								uni.showToast({
									title: "请输入最多10位的昵称",
									duration: 2000
								});
							} else {
								uni.showToast({
									title: "修改成功",
									duration: 2000
								});
								getApp().globalData.nc = this.nc
							}
						}, //请求成功回调，带参数  //请求失败

					});
				} else {
					this.$u.toast('请输入昵称')
				}
			},
			sc1() {

			},

		},

	}
</script>
<style lang="scss">
	#grad1 {
		
	    height: 100%;
		// background-color: red; /* 浏览器不支持时显示 */
	    // background-image: linear-gradient(#ffffff, #55aaff);
		 background-image: linear-gradient(to top, rgba(255,0,0,0), rgba(255, 170, 255, 0.5));
	}
	#particles-js {
		width: 100%;
		height: calc(100% - 100px);
		position: absolute;
	}

	.nihao {
		margin-top: 20px;
		width: 150px;
		background-color: rgb(253, 203, 123);
	}

	.tx {
		display: -webkit-flex;
		display: flex;
		width: 100%;
		height: 250px;
	}

	.tx1 {
		margin: auto;
	}

	.in1 {
		width: 100%;
		border: 1px solid gray;
		height: 80rpx;
	}

	.nc {
		margin-top: 10px;
		display: -webkit-flex;
		display: flex;
	}

	.nc1 {
		font-size: 31rpx;
		width: 150rpx;
	}

	.bu1 {
		height: 80rpx;
		width: 150px;
		font-size: 15rpx;
		background-color: rgb(253, 203, 123);
	}

	.bu11 {
		background-color: rgb(253, 229, 155);
	}
</style>