<template>
	<view id="grad1">
	<view>
		<view class="q1">
			<text>{{this.wz1}}</text>
		</view>
		<view class="q2">
			<br><text>{{this.wz2}}</text>
		</view>
		<view class="q3">
			<br><text>{{this.wz3}}</text>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wz1:"",
				wz2:"",
				wz3:""
			}
		},
		onLoad() {
			this.wz1=getApp().globalData.wz1
			this.wz2=getApp().globalData.wz2
			this.wz3=getApp().globalData.wz3
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	#grad1 {
		
	    height: 100%;
		// background-color: red; /* 浏览器不支持时显示 */
	    // background-image: linear-gradient(#ffffff, #55aaff);
		 background-image: linear-gradient(to top, rgba(255,0,0,0), rgba(255, 170, 255, 0.5));
	}
.q1{
	display: -webkit-flex;
	    display: flex;
	    -webkit-justify-content: center;
	    justify-content: center;
	    width: 100%;
	    height: 50rpx;
		font-size: 50rpx;
}
.q3{
	font-size: 20rpx;
}
</style>
