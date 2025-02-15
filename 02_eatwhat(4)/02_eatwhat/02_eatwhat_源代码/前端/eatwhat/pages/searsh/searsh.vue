<template>
	<view id="grad1">
	<view class="content">
		<view class="box-bg" >
			   <!-- #ifdef MP-WEIXIN||APP||APP-PLUS -->
				<uni-nav-bar  shadow  left-icon="arrow-left" leftText="返回" @clickLeft="fh()" style="margin-top:30px;" title="搜索周边" />
				<!--  #endif -->
				<!-- #ifdef H5 -->
				<uni-nav-bar  shadow  left-icon="arrow-left" leftText="返回" @clickLeft="fh()" title="搜索周边" />
				<!--  #endif -->
		</view>
		<view class="topbox">
			<view class="topimg">
				<image src="../../static/eatimg.gif" mode="" class="logo1"></image>
			</view>
		</view>

		<view class="title">出来混总是要胖的</view>
		<view class="box1">
			<view class="info">
				<input type="text" v-model="food" class="search" placeholder="请输入吃什么" />
			</view>
			<view class="text-area">
			
			
			</view>
			<view class="box2">
				<button class="button popup-success" @click="dialogToggle('success');nearfood()"><text
						class="button-text success-text">吃吃吃</text></button>
				<image src="../../static/eatwhat2.jpg" mode="" class="logo2"></image>
			</view>

		</view>
		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="我才不吃嘞" confirmText="同意" title="吃他"
					content="欢迎使用 uni-popup!" @confirm="dialogConfirm" @close="dialogClose">
					<image src="https://img.chuapp.com/wp-content/uploads/2016/08/201608231471931218.gif?imageView2/2/w/700" mode="" class="logo2"></image>
					</br>{{todayeat}} 
				</uni-popup-dialog>
			</uni-popup>
			<view class="kei" v-for="(item,index) in eatarray"  :key="index" >
			<uni-list-item :title="item"  link  @click="lb(index)" ></uni-list-item>
			</view>
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
				food: '',
				timer: '1',
				temp: '',
				weath: '',
				longitude: '118.613',
				latitude: '24.88946',
				location: '',
				nearby: 5000,
				eatarray: [],
				todayeat: '',
				ket:'MBBBZ-SVGKZ-WKUXN-7B4BA-F7W77-K7B6J',
				url:'https://apis.map.qq.com/uri/v1/routeplan',
				type:'drive',
				lat:'',
				lng:"",
				lat1:"",
				lng1:"",
				to:"",
				eat1:[]
			}

		},
		onLoad() {
			this.showWea()
			this.timer = fun.timer()
			
			this.getLocationAddress()
		},
		methods: {
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
						console.log(res)
						console.log(res.data.length)
						var eatarray = []
						this.eat1=res.data
						for (var i = 0; i < res.data.length; i++) {

							eatarray[i] = res.data[i].title
							// console.log(eatarray[i])
						}
						this.eatarray = eatarray

						var todayeat = this.eatarray[fun.RandomNumber(res.data.length)];
						this.todayeat = todayeat
						this.eatarray.forEach((item, index) => {
							// console.log(item)
						})
						console.log(this.todayeat)
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
						console.log(res);
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
					// 请求成功后的数据
					console.log(res)
					this.eat1=res.data 
					for (var i = 0; i < res.data.length; i++) {
						
						this.eatarray[i] = res.data[i].title
					}
					this.todayeat = this.eatarray[fun.RandomNumber(res.data.length)];
					this.eatarray.forEach((item, index) => {
						console.log(item)
					})
					console.log(this.todayeat)
				})
				// uni.request({
				// 	url: config.mapUrl+'ws/place/v1/search?boundary=nearby(' + this.latitude + ',' + this.longitude + ',' + this.nearby + ')&keyword=' + this.food + '&page_size=1000&page_index=1&key=' + config.mapKey,
				// 	method: 'GET',
				// 	success: (res) => {
				// 		console.log(res)
				// 	}
				// })
			},
			// #endif
			fh(){
				console.log(getApp().globalData.nc)
				uni.switchTab({
					
				    url: '/pages/index/index'
				}); 
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
				console.log('点击确认')
				this.messageText = `点击确认了 ${this.msgType} 窗口`
				this.$refs.message.open()
			},
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			lb(index){
				console.log(index);
				getApp().globalData.lat1=this.latitude,
				getApp().globalData.lng1=this.longitude,
				this.lat=getApp().globalData.lat1,
				this.lng=getApp().globalData.lng1,
				this.lat1=this.eat1[index].location.lat,
				this.lng1=this.eat1[index].location.lng,
				this.to=this.eat1[index].title,
				this.url = this.url + '?' +"referer"+'='+this.ket+'&'+"type"+'='+this.type+'&'+"fromcoord"+'='+this.lat+','+this.lng+'&'+"to"+'='+this.to+'&'+'tocoord'+'='+this.lat1+','+this.lng1+'&'+"coord_type=1";
				window.open(this.url, '_blank');
				this.url='https://apis.map.qq.com/uri/v1/routeplan' 
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

<style>
	#grad1 {
		
	    height: 100%;
		// background-color: red; /* 浏览器不支持时显示 */
	    // background-image: linear-gradient(#ffffff, #55aaff);
		 background-image: linear-gradient(to top, rgba(255,0,0,0), rgba(255, 170, 255, 0.5));
	}
	.content {
		font-size: 28rpx;

	}
	.topimg{
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
		height: 30vh;
		width: 100%;
	}

	.logo2 {
		height: 400rpx;
		width: 400rpx;
	}
	.text-area {
		display: flex;
		justify-content: center;
		width: 60%;
		height: auto;
		margin-top: 100rpx;
	}

	.box1 {
		text-align: center;
		font-size: 100rpx;
		font-weight: 500;
	}

	.info {
		width: 50%;
		display: block;
		margin: 0 auto;
	}
	.search{
		font-size: 20px;
		border-width: 1px;
		background-color: aliceblue;
		height: 70rpx;
		border-style:solid;
		border-color:lightblue;
		color: lightpink;
	}
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.box2 {
		width: 50%;
		 display: block;
		margin: 0 auto;
	}

	.whateat {
		width: 100%;
		height: auto;
	}
</style>