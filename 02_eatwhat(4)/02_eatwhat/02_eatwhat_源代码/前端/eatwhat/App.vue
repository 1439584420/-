<script>
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			yhdl:true,
			yhm:'',
			zpsj:[{title:"",tp:"",lat:"",lng:""}],
			shouci:1,
			lat:'',
			lng:'',
			lat1:"",
			lng1:"",
			title:"",
			tx:"/static/tx1.png",
			nc:"",
			tx:"",
			id:"",
			wz0:"",
			wz1:"",
			wz2:"",
			wz3:"", 
			wz4:"",
			wdlist:[],
		}
	}
	// export default {
	// 	onLaunch: function() {
	// 		console.log('App Launch')
	// 	},
	// 	onShow: function() {
	// 		console.log('App Show')
	// 	},
	// 	onHide: function() {
	// 		console.log('App Hide')
	// 	}
	// }
</script>


<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
