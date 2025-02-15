<template>
	<view id="grad1">
	<view>
		<view class="box-bg">
			<!-- #ifdef MP-WEIXIN||APP||APP-PLUS -->
			<uni-nav-bar shadow left-icon="arrow-left" leftText="返回" @clickLeft="fh()" style="margin-top:30px;"
				title="我的文章" />
			<!--  #endif -->
			<!-- #ifdef H5 -->
			<uni-nav-bar shadow left-icon="arrow-left" leftText="返回" @clickLeft="fh()" title="我的文章" />
			<!--  #endif -->
		</view>
		<view class="kei" v-for="(item,index) in list" :key="index">
			<uni-list-item :title="item.title" :thumb="item.coverImg" :note="item.createTime" link
				@click="lb(index)"></uni-list-item>
			<view class="an">
				<button class="an1" hover-class="bu11" @click="xg(index)">修改</button>
				<button class="an1" hover-class="bu11" @click="sc(index)">删除</button>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import config from '../../common/config.js'
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			let that = this
			this.aaa()

		},
		methods: {
			fh() {
				console.log(getApp().globalData.nc)
				uni.switchTab({

					url: '/pages/user/user'
				});
			},
			aaa() {
				uni.request({
					url: config.api+'/article?pageNum=1&pageSize=100',
					header: {
						"Authorization": uni.getStorageSync('token')
					},
					method: "GET",
					success: (res) => {
						getApp().globalData.wdlist = res.data.data.items
						this.list = getApp().globalData.wdlist
						console.log(res.data.data.items)
					}
				})
			},
			trigger(e) {
				console.log(e)
				this.content[e.index].active = !e.item.active
				uni.navigateTo({
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
			sc(index) {
				uni.request({
					url: 'http://47.99.140.102:8080/article/delete',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						"Authorization": uni.getStorageSync('token')
					},
					data: {
						'id': this.list[index].id,
					},
					method: "DELETE",
					success: (res) => {
						uni.showToast({
							title: "删除成功",
							duration: 2000
						});
						this.aaa()
						console.log(res)
					}
				})
			},
			xg(index) {
				getApp().globalData.wz0 = this.list[index].id
				getApp().globalData.wz1 = this.list[index].title
				getApp().globalData.wz2 = this.list[index].content
				getApp().globalData.wz3 = this.list[index].createTime
				getApp().globalData.wz4 = this.list[index].coverImg
				uni.navigateTo({
					url: '/pages/xgwz/xgwz'
				})
				console.log(index);
			}
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
	.an {
		background-color: #fff;
		display: -webkit-flex;
		display: flex;
		-webkit-justify-content: center;
		justify-content: center;
		width: 100%;
		height: 50px;
	}

	.an1 {
		background-color: rgb(253, 203, 123);
		height: 45px;
	}

	.bu11 {
		background-color: rgb(253, 229, 155);
	}

	.kei {
		opacity: 0.85;
		width: 100%;
		border-bottom: 1px solid gray;
	}
</style>