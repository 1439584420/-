<template>
	<view>
		<button @click="nihao()">dasd</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ket:'MBBBZ-SVGKZ-WKUXN-7B4BA-F7W77-K7B6J',
				url:'https://apis.map.qq.com/uri/v1/routeplan',
				type:'drive',
				lat:getApp().globalData.lat1,
				lng:getApp().globalData.lng1,
				lat1:getApp().globalData.lat,
				lng1:getApp().globalData.lng,
				to:getApp().globalData.title,
			}
		},
		onload(){

		},
		methods: {
			nihao(){	
				this.url = this.url + '?' +"referer"+'='+this.ket+'&'+"type"+'='+this.type+'&'+"fromcoord"+'='+this.lat+','+this.lng+'&'+"to"+'='+this.to+'&'+'tocoord'+'='+this.lat1+','+this.lng1+'&'+"coord_type=1";
				console.log(this.url);
				window.location.href = this.url
			    }
			},
			}
</script>

<style>

</style>
