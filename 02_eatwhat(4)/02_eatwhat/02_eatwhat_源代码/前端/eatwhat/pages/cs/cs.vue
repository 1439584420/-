<template>
	<view id="grad1">
<u-button :ripple="true" shape="circle" type="error" size="medium" plain ripple-bg-color="rgba(255, 0, 4, 0.1)">之约</u-button> 
<div ></div> 
	</view>
</template> 

<script>
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
			}}
			
</script>

<style lang="scss">
#grad1 {
	
    height: 1000px;
	// background-color: red; /* 浏览器不支持时显示 */
    // background-image: linear-gradient(#ffffff, #55aaff);
	 background-image: linear-gradient(to top, rgba(255,0,0,0), rgba(85, 170, 255, 0.5));
}
</style>