<template>
	<view>
		<view class="box-bg" >
			   <!-- #ifdef MP-WEIXIN||APP||APP-PLUS -->
				<uni-nav-bar  shadow  left-icon="arrow-left" leftText="返回" @clickLeft="fh()" style="margin-top:30px;" title="发布文章" />
				<!--  #endif -->
				<!-- #ifdef H5 -->
				<uni-nav-bar  shadow  left-icon="arrow-left" leftText="返回" @clickLeft="fh()" title="发布文章" />
				
				<!--  #endif -->
		</view>
		<view class="xb1">
		  <image class="img1" :src="this.fm" ></image>
		</view>
		<button class="button1" type="button" @click="uploadAvatarImg">上传文章封面</button>
		<view class="nc">
			<text class="nc1">
				文字标题:
			</text>
			<input class="in1"  placeholder="请输入文章标题" v-model="bt"/>
		</view>
		<view class="tx1">
		<text class="nc1">请输入文章内容:</text>
		<uni-easyinput  class="input1"  v-model="text" type="textarea"autoHeight  maxlength="-1" placeholder="请输入文字"></uni-easyinput>
		</view>
		<button class="button1" type="button" @click="sc()">上传文章</button>
	</view>
</template>

<script>
	import config from '../../common/config.js'
	import { pathToBase64, base64ToPath } from 'image-tools'
	export default {
		data() {
			return {
				fm:"/static/tj.png",
				bt:"",
				text:"",
				tempPicUrl:"",
			}
		},
		methods: {
			fh(){
				console.log(getApp().globalData.nc)
				uni.switchTab({
					
				    url: '/pages/list/list'
				}); 
			},
			// 新增图片
					uploadAvatarImg() {
									uni.chooseImage({
										count: 1, //上传数量 默认为 9
										
										success: (res) => {
											this.tempPicUrl = res.tempFilePaths[0]
											console.log(this.tempPicUrl)
											uni.uploadFile({
												url: config.api+'/upload', // 对应后端接口的完整地址
												filePath: this.tempPicUrl, // 图片的临时路径
												name: "file", // 服务器定义的文件字段为 file
												header: { // 配置请求头信息 => jwt 校验
												  //设置用户访问的token信息
												  "Authorization":uni.getStorageSync('token')
												 },
												success: (res) => {
													console.log('上传成功', res)
													console.log(res) //  后端返回的 data 是字符串
													let data = JSON.parse(res.data)
													console.log(data)
													this.avatarPicUrl = data.data
													this.fm=data.data
													this.modifyUserInfoAfterUpload(this.avatarPicUrl, this.userId)
													// 上传成功后使用 vuex 保存，但不做持久处理
													this.$store.commit('user_info/UpdateUserAvatarPic', this.avatarPicUrl)
												},
												fail: (error) => {
													console.log('上传失败', error)
													console.log(this.tempPicUrl)
												}
											})
										}
									})
								},
			sc(){
				if(this.bt && this.text && this.fm)
				{
					uni.request({
					  url:'http://47.99.140.102:8080/article',  
						header:{"Authorization":uni.getStorageSync('token')}, //请求的地址，类型为String
					    method:'POST',
							data:{
								title:this.bt,
								content:this.text,
								coverImg:this.fm,
							},
					     //请求头的信息
					  success:res=>{
						  console.log(res)
						  if(res.data.code==1)
						  {
							  uni.showToast({
							  	title: "请输入最多100字标题",
							  	duration: 2000
							  });
						  }
						  else
						  {
							  uni.showToast({
							  	title: "发布成功",
							  	duration: 2000
							  });
						   getApp().globalData.nc=this.nc
						 }
					  }, //请求成功回调，带参数  //请求失败
					});
				}
				else
				{
					uni.showToast({
						title: "封面以及标题，内容都不允许为空",
						duration: 2000
					});
				}
			},
			uploadFile() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: "http://47.99.140.102:8080/upload", //仅为示例，非真实的接口地址
							method:'POST',
							header:{'content-type' : 'multipart/form-data',"Authorization":uni.getStorageSync('token')}, 
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});
					}
				});

			 
			}
			// 选择背景图片
						
		}
	}
</script>

<style lang="scss">
	.xb1{
		display: -webkit-flex;
		    display: flex;
		    -webkit-justify-content: center;
		    justify-content: center;
		    width: 100%;
		 
	}
	.img1{
		width:200px;
		height: 200px;
	}
	.button1{
		margin-top: 20px;
		width: 200px;
	}
	.tx1{
		margin-top: 20px;
	}
	.nihao{
		margin-top: 20px;
		width: 150px;
		background-color: rgb(253, 203, 123);
	}
	.tx{
		           display: -webkit-flex;
		           display: flex;
		           width: 100%;
		           height: 250px;
	}
	.in1{ 
		width: 100%;
		border:1px solid gray;
		height: 80rpx;
	}
	.nc{
		margin-top: 50px;
		display: -webkit-flex;
		display: flex;
	}
	.nc1{
		font-size: 20px;
		width: 120px;
	}
	.bu1{
		height: 80rpx;
		width: 150px;
		font-size:15rpx;
		background-color: rgb(253, 203, 123);
	}
	.bu11{
		background-color: rgb(253, 229, 155);
	}
</style>
