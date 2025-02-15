<template>
	<view>
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
		<uni-section title="天气预报" type="line" style="text-align: center;">
			<view class="example-body">

				<button class="butt1" type="primary" @click="showDrawer('showLeft')"><text class="word-btn-white">{{tq.casts[0].date}}</text>
				</button>
				<uni-drawer ref="showLeft" mode="left" :width="320" >
					<view class="close">
						<button class="butt1" @click="closeDrawer('showLeft')"><text class="word-btn-white">关闭</text></button>
							<view class="list-item">省份：{{tq.province }}</view>
							<view class="list-item">位置：{{tq.city}}</view>
							<view class="list-item">日期：{{tq.casts[0].date}}</view>
							<view class="list-item">星期：{{tq.casts[0].week }}</view>
							<view class="list-item">白天温度：{{tq.casts[0].daytemp}} 摄氏度</view>
							<view class="list-item">白天天气：{{tq.casts[0].dayweather}}</view>
							<view class="list-item">白天风向：{{tq.casts[0].daywind}}</view>
							<view class="list-item">白天风力：{{tq.casts[0].daypower}}级</view>
							<view class="list-item">晚上温度：{{tq.casts[0].nighttemp}} 摄氏度</view>
							<view class="list-item">晚上天气：{{tq.casts[0].nightweather}}</view>
							<view class="list-item">晚上风向：{{tq.casts[0].nightwind}}</view>
							<view class="list-item">晚上风力：{{tq.casts[0].nightpower}}级</view>
					</view>
				</uni-drawer>
				
				<button class="butt1" type="primary" @click="showDrawer('showLeft1')"><text class="word-btn-white">{{tq.casts[1].date}}</text>
				</button>
				<uni-drawer ref="showLeft1" mode="left" :width="320" @change="change($event,'showLeft')">
					<view class="close">
						<button class="butt1" @click="closeDrawer('showLeft1')"><text class="word-btn-white">关闭</text></button>
							<view class="list-item">省份：{{tq.province }}</view>
							<view class="list-item">位置：{{tq.city}}</view>
							<view class="list-item">日期：{{tq.casts[1].date}}</view>
							<view class="list-item">星期：{{tq.casts[1].week }}</view>
							<view class="list-item">白天温度：{{tq.casts[1].daytemp}} 摄氏度</view>
							<view class="list-item">白天天气：{{tq.casts[1].dayweather}}</view>
							<view class="list-item">白天风向：{{tq.casts[1].daywind}}</view>
							<view class="list-item">白天风力：{{tq.casts[1].daypower}}级</view>
							<view class="list-item">晚上温度：{{tq.casts[1].nighttemp}} 摄氏度</view>
							<view class="list-item">晚上天气：{{tq.casts[1].nightweather}}</view>
							<view class="list-item">晚上风向：{{tq.casts[1].nightwind}}</view>
							<view class="list-item">晚上风力：{{tq.casts[1].nightpower}}级</view>
					</view>
				</uni-drawer>
				
				<button class="butt1" type="primary" @click="showDrawer('showLeft2')"><text class="word-btn-white">{{tq.casts[2].date}}</text>
				</button>
				<uni-drawer ref="showLeft2" mode="left" :width="320" @change="change($event,'showLeft')">
					<view class="close">
						<button class="butt1" @click="closeDrawer('showLeft2')"><text class="word-btn-white">关闭</text></button>
							<view class="list-item">省份：{{tq.province }}</view>
							<view class="list-item">位置：{{tq.city}}</view>
							<view class="list-item">日期：{{tq.casts[2].date}}</view>
							<view class="list-item">星期：{{tq.casts[2].week }}</view>
							<view class="list-item">白天温度：{{tq.casts[2].daytemp}} 摄氏度</view>
							<view class="list-item">白天天气：{{tq.casts[2].dayweather}}</view>
							<view class="list-item">白天风向：{{tq.casts[2].daywind}}</view>
							<view class="list-item">白天风力：{{tq.casts[2].daypower}}级</view>
							<view class="list-item">晚上温度：{{tq.casts[2].nighttemp}} 摄氏度</view>
							<view class="list-item">晚上天气：{{tq.casts[2].nightweather}}</view>
							<view class="list-item">晚上风向：{{tq.casts[2].nightwind}}</view>
							<view class="list-item">晚上风力：{{tq.casts[2].nightpower}}级</view>
					</view>
				</uni-drawer>
				
				<button class="butt1" type="primary" @click="showDrawer('showLeft3')"><text class="word-btn-white">{{tq.casts[3].date}}</text>
				</button>
				<uni-drawer ref="showLeft3" mode="left" :width="320" @change="change($event,'showLeft')">
					<view class="close">
						<button class="butt1" @click="closeDrawer('showLeft3')"><text class="word-btn-white">关闭</text></button>
							<view class="list-item">省份：{{tq.province }}</view>
							<view class="list-item">位置：{{tq.city}}</view>
							<view class="list-item">日期：{{tq.casts[3].date}}</view>
							<view class="list-item">星期：{{tq.casts[3].week }}</view>
							<view class="list-item">白天温度：{{tq.casts[3].daytemp}} 摄氏度</view>
							<view class="list-item">白天天气：{{tq.casts[3].dayweather}}</view>
							<view class="list-item">白天风向：{{tq.casts[3].daywind}}</view>
							<view class="list-item">白天风力：{{tq.casts[3].daypower}}级</view>
							<view class="list-item">晚上温度：{{tq.casts[3].nighttemp}} 摄氏度</view>
							<view class="list-item">晚上天气：{{tq.casts[3].nightweather}}</view>
							<view class="list-item">晚上风向：{{tq.casts[3].nightwind}}</view>
							<view class="list-item">晚上风力：{{tq.casts[3].nightpower}}级</view>
					</view>
				</uni-drawer>
			</view>
		</uni-section>
	</view>
</template>
<script>
	export default {
		
		data() {
			return {
				showRight: false,
				showLeft: false,
				showLeft1:false,
				showLeft2: false,
				showLeft3:false,
					tq:[]
			}
		},
		onLoad() {
			uni.request({
				url:"https://restapi.amap.com/v3/weather/weatherInfo?&key=fb238fd0cfdc25c7326522aac53e7830",
				method: 'GET',
				data:{
					 city:350503,
					 extensions:"all"
				},
				success:(res)=> {
					
					this.tq=res.data.forecasts[0]
				}
			})
			
		},
		methods: {
			confirm() {},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			}
		},
		onNavigationBarButtonTap(e) {
			if (this.showLeft) {
				this.$refs.showLeft.close()
			} else {
				this.$refs.showLeft.open()
			}
		},
		// app端拦截返回事件 ，仅app端生效
		onBackPress() {
			if (this.showRight || this.showLeft) {
				this.$refs.showLeft.close()
				this.$refs.showRight.close()
				return true
			}
		}
	}
</script>

<style lang="scss">
	
	#particles-js {
	  width: 100%;
	  height: calc(100% - 100px);
	  position: absolute;
	}
	.butt1{
		background-color: rgba(85, 170, 255, 0.5);
		margin: 2rpx;
	}
.example-body {
	padding: 10px;
}
.scroll-view {
	/* #ifndef APP-NVUE */
	width: 100%;
	height: 100%;
	/* #endif */
	flex:1
}
// 处理抽屉内容滚动
.scroll-view-box {
	flex: 1;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}
.info {
	padding: 15px;
	color: #666;
}

.info-text {
	font-size: 14px;
	color: #666;
}
.info-content {
	padding: 5px 15px;
}
.close {
	padding: 10px;
}
</style>

