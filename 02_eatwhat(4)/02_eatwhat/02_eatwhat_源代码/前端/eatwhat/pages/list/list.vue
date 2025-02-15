<template>
	<view id="grad1">
	<view>
		<uni-fab :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
			@trigger="trigger"></uni-fab>
		<view class="kei" v-for="(item,index) in list" :key="index">
			<uni-list-item :title="item.title" :thumb="item.coverImg" :note="item.createTime" link
				@click="lb(index)"></uni-list-item>
		</view>
	</view>
	</view>
</template>

<script>
	import config from '../../common/config.js'
	export default {
		data() {
			return {
				content: [{
					iconPath: '/static/tj.png',
					selectedIconPath: '/static/tj.png',
					text: '创建',
					active: false
				}],
				title: 'uni-fab',
				directionStr: '垂直',
				horizontal: 'left',
				vertical: 'bottom',
				direction: 'horizontal',
				list: [{
						title: '标题',
						tp: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
					},
					{
						title: '标题',
						tp: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
					},
					{
						title: '标题',
						tp: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
					},
					{
						title: '标题',
						tp: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'
					}
				]
			}
		},
		onLoad() {
			uni.request({
				url: config.api+'/article/all?pageNum=1&pageSize=100',
				header: {
					"Authorization": uni.getStorageSync('token')
				},
				//要求为Object或String类型的参数，发送到服务器的数据。如果已经不是字符串，将自动转换为字符串格式。get请求中将附加在url后
				method: 'GET',

				//请求头的信息 
				success: res => {
					console.log(res)
					this.list = res.data.data.items
				}, //请求成功回调，带参数  //请求失败

			});
		},
		methods: {
			trigger(e) {
				console.log(e)
				this.content[e.index].active = !e.item.active
				uni.redirectTo({
					url: '/pages/add/add'
				});
			},
			nihao() {
				console.log(this.list)
			},
			lb(index) {
				getApp().globalData.wz1 = this.list[index].title
				getApp().globalData.wz2 = this.list[index].content
				getApp().globalData.wz3 = this.list[index].createTime
				uni.navigateTo({
					url: '/pages/detail/detail'
				})
				console.log(index);
			},
		}
	}
</script>

<style lang="scss">
	#grad1 {
		
	    height: 1000px;
		// background-color: red; /* 浏览器不支持时显示 */
	    // background-image: linear-gradient(#ffffff, #55aaff);
		 background-image: linear-gradient(to top, rgba(255,0,0,0), rgba(85, 170, 255, 0.5));
	}
	.kei {
		width: 100%;
		border-bottom: 1px solid gray;
		opacity:0.8
	}
</style>