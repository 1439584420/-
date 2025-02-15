<template>
	<view id="grad1">
	<view class="view1">
		<uv-sticky>
			<uni-easyinput  class="input1"  :style="{top: `${statusBarHeight}px`}" v-model="TEXT" type="textarea"autoHeight  maxlength="-1" placeholder="请输入文字"></uni-easyinput>
			<button style="background-color: rgb(255, 75, 75) ;color: white; width:100%;" @click="sendToSpark()">发送给大模型</button>
		</uv-sticky>
		<text style="width: 90%;flex-wrap:wrap" selectable="true">{{sparkResult}}</text>
		<uv-divider text="已到底部"></uv-divider>
	</view> 
	</view>
</template>

<script>
	import config from '../../common/config.js'
	import * as base64 from "base-64"
	import CryptoJS from '../../static/crypto-js/crypto-js.js'
	import parser from '../../static/fast-xml-parser/src/parser'
	import * as utf8 from "utf8" 
	export default {  
		// https://spark-api.xf-yun.com/v1.1/chat  V1.5 domain general
		// https://spark-api.xf-yun.com/v2.1/chat  V2.0 domain generalv2
		data() {
			return {
				TEXT: '',
				APPID: 'c7b5517e', // 控制台获取填写
				APISecret: 'NjY3M2Y4NjZiMDRkOTkyZTVjYmMwNzIz',
				APIKey: '9134f2cf64ad4b93736afbfde0e42d91',
				sparkResult: '',
				historyTextList: [], // 历史会话信息，由于最大token12000,可以结合实际使用，进行移出
				tempRes: '' ,// 临时答复保存
				statusBarHeight:''
			}
		},
		
		methods: {
			navigateBack() {
				uni.navigateBack()
			},
			async sendToSpark() {
				let myUrl = await this.getWebSocketUrl();
				this.tempRes = "";
				// this.sparkResult = "";
				let realThis = this;
				this.socketTask = uni.connectSocket({
					//url: encodeURI(encodeURI(myUrl).replace(/\+/g, '%2B')),
					url: myUrl,
					method: 'GET',
					success: res => {
						console.log(res, "ws成功连接...", myUrl)
						realThis.wsLiveFlag = true;
					}
				})
				realThis.socketTask.onError((res) => {
					console.log("连接发生错误，请检查appid是否填写", res)
				})
				realThis.socketTask.onOpen((res) => {
					this.historyTextList.push({
						"role": "user",
						"content": this.TEXT
					})
					console.info("wss的onOpen成功执行...", res)
					// 第一帧..........................................
					console.log('open成功...')
					let params = {
						"header": {
							"app_id": this.APPID,
							"uid": "aef9f963-7"
						},
						"parameter": {
							"chat": {
								"domain": "generalv3",
								"temperature": 0.5,
								"max_tokens": 4000
							}
						},
						"payload": {
							"message": {
								"text": this.historyTextList
							}
						}
					};
					// console.log("请求的params：" + JSON.stringify(params))
					this.sparkResult = this.sparkResult + "\r\n我：" + this.TEXT + "\r\n"
					this.sparkResult = this.sparkResult + "大模型："
					// console.log("发送第一帧...", params)
					realThis.socketTask.send({ // 发送消息，，都用uni的官方版本
						data: JSON.stringify(params),
						success() {
							console.log('第一帧发送成功')
						}
					});
				});

				// 接受到消息时
				realThis.socketTask.onMessage((res) => {
					// console.log('收到API返回的内容：', res.data);
					let obj = JSON.parse(res.data)
					// console.log("我打印的"+obj.payload);
					let dataArray = obj.payload.choices.text;
					for (let i = 0; i < dataArray.length; i++) {
						realThis.sparkResult = realThis.sparkResult + dataArray[i].content
						realThis.tempRes = realThis.tempRes + dataArray[i].content
					}
					// realThis.sparkResult =realThis.sparkResult+ 
					let temp = JSON.parse(res.data)
					// console.log("0726",temp.header.code)
					if (temp.header.code !== 0) {
						console.log(`${temp.header.code}:${temp.message}`);
						realThis.socketTask.close({
							success(res) {
								console.log('关闭成功', res)
								realThis.wsLiveFlag = false;
							},
							fail(err) {
								console.log('关闭失败', err)
							}
						})
					}
					if (temp.header.code === 0) {
						if (res.data && temp.header.status === 2) {
							realThis.sparkResult = realThis.sparkResult +
								"\r\n**********************************************"
							this.historyTextList.push({
								"role": "assistant",
								"content": this.tempRes
							})
							/* let dataArray= obj.payload.choices.text;
							for(let i=0;i<dataArray.length;i++){
								realThis.sparkResult =realThis.sparkResult+ dataArray[i].content
							} */
							setTimeout(() => {
								realThis.socketTask.close({
									success(res) {
										console.log('关闭成功', res)
									},
									fail(err) {
										// console.log('关闭失败', err)
									}
								})
							}, 1000)
						}
					}
				})
			},
			// 鉴权
			getWebSocketUrl() {
				return new Promise((resolve, reject) => {
					// https://spark-api.xf-yun.com/v1.1/chat  V1.5 domain general
					// https://spark-api.xf-yun.com/v2.1/chat  V2.0 domain generalv2
					var url = "wss://spark-api.xf-yun.com/v3.1/chat";
					var host = "spark-api.xf-yun.com";
					var apiKeyName = "api_key";
					var date = new Date().toGMTString();
					var algorithm = "hmac-sha256";
					var headers = "host date request-line";
					var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v3.1/chat HTTP/1.1`;
					var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, this.APISecret);
					var signature = CryptoJS.enc.Base64.stringify(signatureSha);
					var authorizationOrigin =
						`${apiKeyName}="${this.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
					var authorization = base64.encode(authorizationOrigin);
					url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;

					// console.log(url)
					resolve(url); // 主要是返回地址
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	#grad1 {
		
	    height: 1000px;
		// background-color: red; /* 浏览器不支持时显示 */
	    // background-image: linear-gradient(#ffffff, #55aaff);
		 background-image: linear-gradient(to top, rgba(255,0,0,0), rgba(85, 170, 255, 0.5));
	}
.view1{
		opacity: 0.99;
}
.input1{
	position: sticky;
    border: 1px solid gainsboro; 
}
</style> 