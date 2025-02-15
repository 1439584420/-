<template>
<view id="grad1">
	<view class="content">
		<view class="box-bg">
			<!-- #ifdef MP-WEIXIN||APP||APP-PLUS -->
			<uni-nav-bar v-if="dlzt" shadow rightText="登录" @clickRight="nihao" style="margin-top:30px;" title="大转盘" />
			<uni-nav-bar v-else shadow rightText="我的" @clickRight="wode" style="margin-top:30px;" title="大转盘" />
			<!--  #endif -->
			<!-- #ifdef H5 -->
			<uni-nav-bar v-if="dlzt" shadow rightText="登录" @clickRight="nihao" title="大转盘" />
			<uni-nav-bar v-else shadow rightText="我的" @clickRight="wode" title="大转盘" />
			<!--  #endif -->
		</view>

		<view class="topbox">
			<view class="topimg">
				<image src="../../static/eatimg.gif" mode="" class="logo1"></image>
			</view>
		</view>

		<view class="title">人生苦短，再来一碗。</view>
		<view class="box1">
			<view class="info">
				<uv-button text="镂空按钮" size="normal" type="primary" plain @click="tq">现在是：{{weath}} 气温：{{temp}}
					，又不知道吃什么咯</uv-button>
			</view>
		</view>
		<view class="xz1">
			<view class="xz2">
		<image src="/static/xz1.png" class="xuanz"></image>
		<image src="/static/xz2.png" class="xuanz"></image>
		<image src="/static/xz3.png" class="xuanz"></image>
		<image src="/static/xz4.png" class="xuanz"></image>
		<image src="/static/xz5.png" class="xuanz"></image>
		<image src="/static/xz6.png" class="xuanz"></image>
		<image src="/static/xz7.png" class="xuanz"></image>
		</view>
		</view>
		<view class="xz1">
			<view class="xz2">
				<image src="/static/xz8.png" class="xuanz1"></image>
		</view>
		</view>
		<view></view>
		<view id="app">
			<uni-popup ref="popup" type="center" :animation="false" :duration="0">
				<view class="nihao" height="">{{showTextList[result].title}}</view>
			</uni-popup>
			<view class="container" @click="startLottery" :style="{ top: windowSize.height * 0.05 + 'px' }">
				<!-- 转盘 -->
				<view class="circle" :animation="animationData">
					<view class="lines">
						<view v-for="(item, index) in lineList" :key="index"
							:style="{ transform: 'rotate(' + item.rotateDeg + 'deg)' }">

						</view>
					</view>

					<view class="texts">
						<view v-for="(item, index) in showTextList1"
							:style="{ transform: 'rotate(' + item.rotateDeg + 'deg)' }">
							<text class="text1">{{ item.title }}</text>
						</view>
					</view>
				</view>
				<!-- 指针 -->
				<view class="pointer">
					<view class="pointer-triangle" :style="{
            borderBottomWidth: (windowSize.width / 20)+35 + 'rpx',
            borderRightWidth: (windowSize.width / 60)+15 + 'rpx',
            borderLeftWidth: (windowSize.width / 60)+15 + 'rpx',
          }"></view>
					<view class="pointer-circle" :style="{
            width: (windowSize.width / 30)+35 + 'rpx',
            height: (windowSize.width / 30)+35 +'rpx',
          }">GO</view>
				</view>
			</view>
		</view>

		<view class="box2">
			<u-button :ripple="true" shape="circle" type="warning" size="default" plain ripple-bg-color="rgba(255, 0, 4, 0.1)" class="button1" @click="nearfood()"><text class="button-text1">周边美食随机</text></u-button>
			<u-button :ripple="true" shape="circle" type="warning" size="default" plain ripple-bg-color="rgba(255, 0, 4, 0.1)" class="button1" @click="nearfood1()"><text class="button-text1">手动选择</text></u-button>
		</view>
		<view class="box3">
			<image src="../../static/eatwhat2.jpg" mode="" class="logo2"></image>
		</view>

		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="我才不吃嘞" confirmText="进行导航" title="吃他"
					content="欢迎使用 uni-popup!" @confirm="dialogConfirm"
					@close="dialogClose">{{showTextList[result].title}}<br><br>地点:{{showTextList[result].add}}
					<image src="../../static/eatfood.jpg" mode="" class="logo2"></image>
				</uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
	</view>
</template>

<script>
	import fun from '../../common/function.js' //调用function里的方法
	import config from '../../common/config.js' //调用config里的常量
	var QQMapWX = require('../../common/qqmap-wx-jssdk.js');
	var qqmapsdk = new QQMapWX({
		key: config.mapKey // 必填
	});

	export default {
		data() {
			return {
				food: '午餐',
				timer: '1',
				temp: '18',
				weath: '晴',
				longitude: '118.613',
				latitude: '24.88946',
				location: '',
				nearby: 5000,
				eatarray: [],
				todayeat: '',
				windowSize: {},
				lineList: [{
					rotateDeg: ''
				}],
				showTextList: [{
					title: "再摇一次",
					rotateDeg: '',
					tp: "",
					lat: "",
					lng: ''
				}],
				showTextList1: [{
					title: "再摇一次",
					rotateDeg: '',
					lat: "",
					lng: ''
				}],
				isClicked: false,
				animationData: {},
				lastResult: 0,
				result: 0,
				deg: 0,
				deg_p: [0, 0, 0, 0, 45, 0, 0, 0, 22, 0, 35, 0, 43], //偏移值
				dlzt: true,
				zpsj: [{
					title: "",
					lng: '',
					lat: '',
					tp: ""
				}],
				sl: '',
				he: '',

				ket: 'MBBBZ-SVGKZ-WKUXN-7B4BA-F7W77-K7B6J',
				url: 'https://apis.map.qq.com/uri/v1/routeplan',
				type: 'drive',
				lat: '',
				lng: "",
				lat1: "",
				lng1: "",
				to: "",
			}

		},

		onLoad() {
			const systemInfo = uni.getSystemInfoSync();
			const isMobile = systemInfo.platform === 'android' || systemInfo.platform === 'ios';

			if (isMobile) {
				uni.showToast({
					icon: 'none',
					title: '手机用户您好',
					duration: 3000
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '电脑用户您好',
					duration: 3000
				});
			}

			this.dlzt = getApp().globalData.yhdl;
			this.showWea();
			this.timer = fun.timer();
			this.food = fun.temptoeat(this.timer, this.weath);
			this.getLocationAddress();
		},
		mounted() {

			this.windowSize = this.getWindowSize();
		},
		methods: {
			tq(){
					uni.navigateTo({
						url: '/pages/gjx/gjx' 
					});
			},
			sjcsh() {

				this.initData();
				this.zpsj = getApp().globalData.zpsj;

				if (this.zpsj.length > 12) {
					this.he = 12;
				} else {
					this.he = this.zpsj.length
				}
				if ((this.he) % 2 == 1) {
					for (let i = 0; i <= this.he; i++) {
						if (i == this.he) {
							this.showTextList.push({
								title: "再摇一次",
								rotateDeg: -i * (360 / (this.he + 1)),
								tp: "",
								lng: "",
								lat: ""
							})
						} else {
							this.showTextList.push({
								title: this.zpsj[i].title,
								rotateDeg: -i * (360 / (this.he + 1)),
								tp: this.zpsj[i].tp,
								lng: this.zpsj[i].lng,
								lat: this.zpsj[i].lat,
								add: this.zpsj[i].add
							})

						}
					};
					for (let i = 0; i < (this.he) / 2; i++) {
						this.lineList.push({
							rotateDeg: i * (360 / (this.he + 1)) + this.deg_p[this.he + 1]
						})
					};
				} else {
					for (let i = 0; i <= this.he - 1; i++) {
						this.showTextList.push({
							title: this.zpsj[i].title,
							rotateDeg: -i * (360 / (this.he)),
							tp: this.zpsj[i].tp,
							lng: this.zpsj[i].lng,
							lat: this.zpsj[i].lat,
							add: this.zpsj[i].add
						})
					};
					for (let i = 0; i < (this.he) / 2; i++) {
						this.lineList.push({
							rotateDeg: (i * (360 / (this.he))) + this.deg_p[this.he]
						})

					};
				}
				this.lineList.splice(0, 1);
				this.showTextList.splice(0, 1);
				this.showTextList1.splice(0, 1);
				console.log(this.showTextList)
				for (let i = 0; i < this.showTextList.length; i++) {
					if (this.showTextList[i].title.length > 5) {
						this.showTextList1.push({
							title: this.showTextList[i].title.substring(0, 5) + '...',
							rotateDeg: this.showTextList[i].rotateDeg,
							lng: this.showTextList[i].lng,
							lat: this.showTextList[i].lat,
							add: this.showTextList[i].add
						})
					} else {
						this.showTextList1.push({
							title: this.showTextList[i].title,
							rotateDeg: this.showTextList[i].rotateDeg,
							lng: this.showTextList[i].lng,
							lat: this.showTextList[i].lat,
							add: this.showTextList[i].add
						})
					}

				};
				console.log(this.showTextList1)




			},
			nihao() {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			},
			wode() {
				uni.reLaunch({
					url: '/pages/user/user'
				});
			},
			/* 获取屏幕可用尺寸 */
			getWindowSize() {
				const windowInfo = uni.getWindowInfo();
				let availableWindowSize = {
					width: 0,
					height: 0
				};
				availableWindowSize.width = windowInfo.windowWidth; //px
				availableWindowSize.height = windowInfo.windowHeight; //px
				// console.log("windowSize", this.windowSize);
				return availableWindowSize;
			},
			// 初始化数据
			initData() {

			},
			/* 开始旋转抽奖 */
			startLottery() {
				if (this.isClicked) {
					//已经点击了
					console.log("点击太频繁啦");
					return;
				}
				this.isClicked = true;

				let animation = uni.createAnimation({
					transformOrigin: "50% 50%",
					duration: 2000,
					timingFunction: "ease-in-out",
					delay: 0,
				});
				this.animationData = animation;
				this.animationData.rotate(this.randomNum()).step();
				this.animationData = this.animationData.export();
				setTimeout(() => {
					let that = this
					this.dialogToggle('success');
					this.isClicked = false;
				}, 2000);
			},
			/* 获取随机数 */
			randomNum() {
				console.log(this.showTextList)
				if ((this.showTextList.length) % 2 == 1) {
					this.sl = 360 / (this.showTextList.length + 1)
					this.result = Math.floor(Math.random() * (this.showTextList.length + 1));
					getApp().globalData.lat = this.showTextList[this.result].lat
					getApp().globalData.lng = this.showTextList[this.result].lng
					getApp().globalData.title = this.showTextList[this.result].title

				} else {
					this.sl = 360 / (this.showTextList.length)
					this.result = Math.floor(Math.random() * (this.showTextList.length));
					getApp().globalData.lat = this.showTextList[this.result].lat
					getApp().globalData.lng = this.showTextList[this.result].lng


				} //数组索引：[0,5]
				if (this.result > this.lastResult) {
					this.deg += 360 * 4 + (this.result - this.lastResult) * this.sl;
				} else {
					this.deg += 360 * 4 + 360 - (this.lastResult - this.result) * this.sl;
				}
				// console.log(`result:${this.result},deg:${this.deg}`);
				this.lastResult = this.result;

				// uni.showToast({
				//        title: '添加成功',
				//        icon: 'success',
				//        duration: 5000
				//      });
				return this.deg;
			},
			// #ifdef MP-WEIXIN


			showWea() {

				// 实例化API核心类
				qqmapsdk = new QQMapWX({
					key: config.mapKey
				});
				// 调用接口
				qqmapsdk.reverseGeocoder({
					success: (res) => {
						console.log("success");
						console.log(res.result.location);
						var longitude = res.result.location.lng;
						var latitude = res.result.location.lat;
						var location = fun.numFilter(longitude) + ',' + fun.numFilter(latitude);
						this.location = location,
							this.latitude = latitude,
							this.longitude = longitude,
							console.log(this.longitude);
						wx.request({
							url: 'https://devapi.qweather.com/v7/weather/now?location=' + location +
								'&key=' + config.weaKey,
							method: 'GET',
							dataType: "json",
							success: (res) => {
								console.log(res)
								console.log("温度：" + res.data.now.temp)
								console.log("天气：" + res.data.now.text)
								var temp = res.data.now.temp
								var weath = res.data.now.text

								this.temp = res.data.now.temp
								this.weath = res.data.now.text
								console.log(this.longitude);

							}

						})
						// 拿到当前地址和坐标
					},
					fail: function(res) {
						console.log(res);
					},
				});
			},
			nearfood() {
				qqmapsdk = new QQMapWX({
					key: config.mapKey
				});
				qqmapsdk.search({
					keyword: this.food, //搜索关键词
					page_size: 30,
					page_index: 1,
					location: this.latitude + ',' + this.longitude, //设置周边搜索中心点
					success: (res) => { //搜索成功后的回调
						this.zpsj.splice(0, 1000)
						var eatarray = []
						for (var i = 0; i < res.data.length; i++) {

							eatarray[i] = res.data[i].title
							this.zpsj.push({
								title: res.data[i].title,
								lng: res.data[i].location.lng,
								lat: res.data[i].location.lat,
								add: res.data[i].address
							})
							// console.log(eatarray[i])
						}
						this.eatarray = eatarray
						var todayeat = this.eatarray[fun.RandomNumber(res.data.length)];
						this.todayeat = todayeat
						this.eatarray.forEach((item, index) => {
							// console.log(item)
						})

						getApp().globalData.zpsj = this.zpsj;
						this.showTextList.splice(0, 1000);
						this.showTextList1.splice(0, 1000);
						this.showTextList.push({
							title: "再摇一次",
							rotateDeg: '',
							tp: ""
						})
						this.showTextList1.push({
							title: "再摇一次",
							rotateDeg: ''
						})
						let that = this;
						that.sjcsh();
					},
					fail: function(res) {
						console.log(res);
					},
				});
			}
			// #endif
			// #ifdef H5

			showWea() {

				uni.getLocation({
					type: 'wgs84',
					geocode: true,

					success: (res) => {
						var longitude = res.longitude;
						var latitude = res.latitude;
						console.log(longitude);
						console.log(latitude);
						var location = fun.numFilter(res.longitude) + ',' + fun.numFilter(res.latitude);
						this.longitude = longitude;
						this.latitude = latitude;
						this.location = location
						console.log(res)
						uni.request({
							url: 'https://devapi.qweather.com/v7/weather/now?location=' + location +
								'&key=' + config.weaKey,
							method: 'GET',
							dataType: "json",
							success: (res) => {
								console.log(res)
								console.log("温度：" + res.data.now.temp)
								console.log("天气：" + res.data.now.text)
								var temp = res.data.now.temp
								var weath = res.data.now.text
								this.temp = temp
								this.weath = weath

							}
						})
					}
				})
			},
			nearfood() {
				this.food = fun.temptoeat(this.timer, this.weath)
				var url = 'https://apis.map.qq.com/ws/place/v1/search';
				this.$jsonp(url, {
					key: config.mapKey,
					// 以下填写需要携带的参数（有几个写一个）
					boundary: 'nearby(' + this.latitude + ',' + this.longitude + ',' + this.nearby + ')',
					keyword: this.food,
					output: 'jsonp',
					page_size: 30,
					page_index: 1,
				}).then(res => {
					this.zpsj.splice(0, 1000)
					// 请求成功后的数据
					console.log(res.data)
					for (var i = 0; i < res.data.length; i++) {
						this.eatarray[i] = res.data[i].title
						console.log(res)
						this.zpsj.push({
							title: res.data[i].title,
							lng: res.data[i].location.lng,
							lat: res.data[i].location.lat,
							add: res.data[i].address
						})
					}
					this.todayeat = this.eatarray[fun.RandomNumber(res.data.length)];
					this.eatarray.forEach((item, index) => {

					})
					getApp().globalData.zpsj = this.zpsj;
					this.showTextList.splice(0, 1000);
					this.showTextList1.splice(0, 1000);
					this.showTextList.push({
						title: "再摇一次",
						rotateDeg: '',
						tp: ""
					})
					this.showTextList1.push({
						title: "再摇一次",
						rotateDeg: ''
					})
					let that = this;
					that.sjcsh();
				})
				// uni.request({
				// 	url: config.mapUrl+'ws/place/v1/search?boundary=nearby(' + this.latitude + ',' + this.longitude + ',' + this.nearby + ')&keyword=' + this.food + '&page_size=1000&page_index=1&key=' + config.mapKey,
				// 	method: 'GET',
				// 	success: (res) => {
				// 		console.log(res)
				// 	}
				// })
			}
			// #endif
			,
			nearfood1() {
				uni.navigateTo({
					url: '/pages/searsh/searsh'
				})
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			messageToggle(type) {
				this.msgType = type
				this.messageText = `这是一条${type}消息提示`
				this.$refs.message.open()
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				// MBBBZ-SVGKZ-WKUXN-7B4BA-F7W77-K7B6J
				console.log('导航开始')
				getApp().globalData.lat1 = this.latitude,
					getApp().globalData.lng1 = this.longitude,
					this.messageText = `点击确认了 ${this.msgType} 窗口`,
					this.lat = getApp().globalData.lat1,
					this.lng = getApp().globalData.lng1,
					this.lat1 = getApp().globalData.lat,
					this.lng1 = getApp().globalData.lng,
					this.to = getApp().globalData.title,
					this.url = this.url + '?' + "referer" + '=' + this.ket + '&' + "type" + '=' + this.type + '&' +
					"fromcoord" + '=' + this.lat + ',' + this.lng + '&' + "to" + '=' + this.to + '&' + 'tocoord' + '=' +
					this.lat1 + ',' + this.lng1 + '&' + "coord_type=1";
				window.open(this.url, '_blank');
				this.url='https://apis.map.qq.com/uri/v1/routeplan'
			},
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			dialogClose() {
				console.log('点击关闭')
			},
			dialogInputConfirm(val) {
				uni.showLoading({
					title: '3秒后会关闭'
				})

				setTimeout(() => {
					uni.hideLoading()
					console.log(val)
					this.value = val
					// 关闭窗口后，恢复默认内容
					this.$refs.inputDialog.close()
				}, 3000)
			},
			shareToggle() {
				this.$refs.share.open()
			}
		}
	}
</script>

<style scoped>
	.xuanz{
		width: 50px;
		height: 50px;
			animation:myfirst 5s;
			-webkit-animation:myfirst 5s; /* Safari and Chrome */
			-webkit-animation-iteration-count:infinite;
	}
	.xuanz1{
		width: 50px;
		height: 50px;
			animation:myfirst1 5s;
			-webkit-animation:myfirst1 20s; /* Safari and Chrome */
			-webkit-animation-iteration-count:infinite;
			animation-direction:alternate;
	}
	.xz2{
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-between;
    justify-content: space-between;
	width: 50%;
    height: 50px;
	}
	.xz1{
		width: 100%;
		height: 50px;
		display: -webkit-flex;
		display: flex;
		-webkit-justify-content: center;
		justify-content: center;
	}
	@keyframes myfirst
	{
		0%   {left:0px; top:0px;transform: rotate(360deg);left:-100px; top:0px;}
		50%   {left:0px; top:0px;transform: rotate(0deg);left:100px; top:0px;}
		100%   {left:0px; top:0px;transform: rotate(360deg);left:-100px; top:0px;}
		
	}
	@keyframes myfirst1
	{
		0%   {left:0px; top:0px;transform: rotate(-720deg);left:0px; top:0px;}
		50%   {left:0px; top:0px;transform: rotate(0deg);left:100%; top:0px;}
		100%   {left:0px; top:0px;transform: rotate(-720deg);left:0px; top:0px;}
	}
	#grad1 {
		
	    height: 1000px;
		// background-color: red; /* 浏览器不支持时显示 */
	    // background-image: linear-gradient(#ffffff, #55aaff);
		 background-image: linear-gradient(to top, rgba(255,0,0,0), rgba(85, 170, 255, 0.5));
	}
	.nihao {
		height: 100rpx;
		width: 300rpx;
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.tp1 {
		height: 50px;
		width: 100%;
	}

	.title {
		text-align: center;
	}

	.container {
		position: relative;
		width: 100%;
		/* background: rgba(87, 189, 106, 0.5); */

	}

	.circle {
		position: relative;
		margin: auto;
		width: 500rpx;
		height: 500rpx;
		border-radius: 50%;
		border: 20rpx solid goldenrod;
		background: rgba(0, 112, 46, 0.8);
	}

	.lines {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.lines>view {
		display: inline-block;
		width: 100%;
		height: 1%;
		position: absolute;
		transform-origin: center center;
		background-color: #f5b362;
	}

	.text1 {
		font-size: 30rpx;
	}

	.texts {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
	}

	.texts view {
		display: inline-block;
		height: 96%;
		color: white;
		position: absolute;
		writing-mode: vertical-lr;
		transform-origin: center center;
		/* background-color: #bd2d30; */
	}

	.pointer {
		position: absolute;
		margin: auto;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		/* border: 5rpx solid yellow; */
	}

	.pointer-triangle,
	.pointer-circle {
		position: absolute;
		z-index: 1;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: inline-block;
	}

	.pointer-triangle {
		width: 0;
		height: 0;
		border-style: solid;
		border-top-width: 0px;
		border-color: transparent transparent #bd2d30 transparent;
		transform: translate(-50%, -100%);
	}

	.pointer-circle {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		color: white;
		font-weight: bold;
		background: #bd2d30;
	}



	.content {
		font-size: 28rpx;

	}

	.topimg {
		display: flex;
		align-items: center;
	}

	.popup-success {
		color: #fff;
		background-color: #e1f3d8;
	}

	.success-text {
		color: #09bb07;
	}

	.title {
		text-align: center;
		font-size: 100rpx;
		font-weight: 500;
		margin-bottom: 100rpx;
	}

	.headeat {
		height: 200rpx;
		width: 500rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.logo1 {
		text-align: center;
		margin: 0 auto;
		height: 230rpx;
		width: 50%;
	}

	.logo2 {
		height: 400rpx;
		width: 400rpx;
		display: block;

	}

	.text-area {
		display: flex;
		justify-content: center;
		width: 60%;
		height: auto;
		margin-top: 100rpx;
	}

	.box1 {
		display: flex;

		font-size: 100rpx;
		font-weight: 500;
	}

	.info {
		width: 50%;
		display: block;
		margin: 0 auto;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.box2 {
		display: -webkit-flex;
		display: flex;
		padding-top: 100rpx;
		width: 60%;
		display: block;
		margin: 0 auto;
	}

	.button1 {
		width: 150px;
		margin-top: 10px;
		background-color: #fdb249;
	}


	.whateat {
		width: 100%;
		height: auto;
	}

	.box3 {
		display: -webkit-flex;
		display: flex;
		-webkit-justify-content: center;
		justify-content: center;
		width: 100%;
		height: 250px;
		margin-top: 20rpx;
	}

	.logo2 {}
</style>