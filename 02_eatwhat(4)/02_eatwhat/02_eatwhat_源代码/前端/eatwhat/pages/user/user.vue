<template>
	<!-- index.wxml -->
	<view id="grad1">
	<view class="container">
		<view class="box-bg">
			<!-- #ifdef MP-WEIXIN||APP||APP-PLUS -->
			<uni-nav-bar shadow rightText="设置" @clickRight="nihao" style="margin-top:30px;" title="我的" />
			<!--  #endif -->
			<!-- #ifdef H5 -->
			<uni-nav-bar shadow rightText="设置" @clickRight="nihao" title="我的" />

			<!--  #endif -->
		</view>
		<view class="infolist">
			<view class="tx1">
				<u-avatar :src="this.tx" mode="circle" class="tx1.1" size="300" @click="uploadAvatarImg"></u-avatar>
			</view>
			<view class="tx2">
				<text>昵称:{{this.nc}}</text>
			</view>
			<view class="m-info" :data-link="info.link" @tap="gotoFun(index)" v-for="(info, index) in infoList"
				:key="index">
				<text>{{ info.title }}</text>
			</view>
		</view>
		<view class="m-info">
			<text>当前版本1.0.0</text>
			<view class="m-chevron">
				<image class="chevron"></image>
			</view>
		</view>

	</view>
	</view>
</template>

<script>
	//获取应用实例
	import config from '../../common/config.js'
	const app = getApp();
	export default {
		data() {
			return {
				nc: getApp().globalData.nc,
				tx: "/static/eatimg.gif",
				infoList: [{
						title: '我的文章',
						link: 'about'
					},
					{
						title: '给亲爱的用户的一封信',
						link: 'about',
					}

				],

			};
		},
		onLoad() {
			this.nc = getApp().globalData.nc
			this.tx = getApp().globalData.tx
		},
		onShareAppMessage: function(e) {},
		methods: {
			nihao() {
				uni.redirectTo({
					url: '/pages/wd/wd'
				});
			},
			gotoFun(index) {
				console.log(index)
				if (index == 1) {
					uni.navigateTo({
						url: '/pages/about/index',

					})
				} else {
					uni.navigateTo({
						url: '/pages/wdlist/wdlist',

					})
				}
			}
		}
	};
</script>
<style>
	#grad1 {
		
	    height: 1000px;
		// background-color: red; /* 浏览器不支持时显示 */
	    // background-image: linear-gradient(#ffffff, #55aaff);
		 background-image: linear-gradient(to top, rgba(255,0,0,0), rgba(85, 170, 255, 0.5));
	}
	.tx1 {
		margin-top: 20px;
		display: -webkit-flex;
		display: flex;
		-webkit-justify-content: center;
		justify-content: center;
		width: 1;
		height: 180px;
	}

	.tx2 {
		display: -webkit-flex;
		display: flex;
		-webkit-justify-content: center;
		justify-content: center;
		width: 100%;
		height: 50rpx;
	}


	.m-info {
		border-top: 1rpx solid #555555;
		border-bottom: 1rpx solid #555555;
		margin-top: 20px;
		box-sizing: border-box;
		display: block;
		height: 88rpx;
		line-height: 88rpx;
		font-size: 34rpx;
		color: #000;
		margin-left: 30rpx;
		padding-right: 30rpx;
	}

	.m-info:first-child {
		border-top: 0rpx;
	}

	.m-info .m-chevron {
		float: right;
		margin-left: 30rpx;
	}

	.m-info .m-chevron .chevron {
		width: 16rpx;
		height: 26rpx;
		vertical-align: middle;
	}
</style>