(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0dd4":function(e,t,o){"use strict";o.r(t);var n=o("e019"),a=o.n(n);for(var i in n)["default"].indexOf(i)<0&&function(e){o.d(t,e,(function(){return n[e]}))}(i);t["default"]=a.a},"38ee":function(e,t,o){"use strict";o.r(t);var n=o("3bfb"),a=o("0dd4");for(var i in a)["default"].indexOf(i)<0&&function(e){o.d(t,e,(function(){return a[e]}))}(i);o("6aab");var u=o("f0c5"),l=Object(u["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);t["default"]=l.exports},"3bfb":function(e,t,o){"use strict";o.d(t,"b",(function(){return a})),o.d(t,"c",(function(){return i})),o.d(t,"a",(function(){return n}));var n={uvButton:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uv-button/components/uv-button/uv-button")]).then(o.bind(null,"b5d6"))},uniPopup:function(){return o.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(o.bind(null,"3e88"))},uniPopupDialog:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog")]).then(o.bind(null,"f2ed"))}},a=function(){var e=this.$createElement;this._self._c},i=[]},"6aab":function(e,t,o){"use strict";var n=o("7a3d"),a=o.n(n);a.a},"7a3d":function(e,t,o){},e019:function(e,t,o){"use strict";(function(e,n){var a=o("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(o("45ff")),u=a(o("2832")),l=o("7fda"),s=new l({key:u.default.mapKey}),c={data:function(){return{food:"午餐",timer:"1",temp:"",weath:"",longitude:"",latitude:"",location:"",nearby:5e3,eatarray:[],todayeat:""}},onLoad:function(){this.showWea(),this.timer=i.default.timer(),this.food=i.default.temptoeat(this.timer,this.weath),this.getLocationAddress()},methods:{showWea:function(){var t=this;s=new l({key:u.default.mapKey}),s.reverseGeocoder({success:function(o){console.log("success"),console.log(o.result.location);var n=o.result.location.lng,a=o.result.location.lat,l=i.default.numFilter(n)+","+i.default.numFilter(a);t.location=l,t.latitude=a,t.longitude=n,console.log(t.longitude),e.request({url:"https://devapi.qweather.com/v7/weather/now?location="+l+"&key="+u.default.weaKey,method:"GET",dataType:"json",success:function(e){console.log(e),console.log("温度："+e.data.now.temp),console.log("天气："+e.data.now.text);e.data.now.temp,e.data.now.text;t.temp=e.data.now.temp,t.weath=e.data.now.text,console.log(t.longitude)}})},fail:function(e){console.log(e)}})},nearfood:function(){var e=this;s=new l({key:u.default.mapKey}),s.search({keyword:this.food,page_size:30,page_index:1,location:this.latitude+","+this.longitude,success:function(t){console.log(t),console.log(t.data.length);for(var o=[],n=0;n<t.data.length;n++)o[n]=t.data[n].title;e.eatarray=o;var a=e.eatarray[i.default.RandomNumber(t.data.length)];e.todayeat=a,e.eatarray.forEach((function(e,t){})),console.log(e.todayeat)},fail:function(e){console.log(e)}})},change:function(e){console.log("当前模式："+e.type+",状态："+e.show)},toggle:function(e){this.type=e,this.$refs.popup.open(e)},messageToggle:function(e){this.msgType=e,this.messageText="这是一条".concat(e,"消息提示"),this.$refs.message.open()},dialogToggle:function(e){this.msgType=e,this.$refs.alertDialog.open()},dialogConfirm:function(){console.log("点击确认"),this.messageText="点击确认了 ".concat(this.msgType," 窗口"),this.$refs.message.open()},inputDialogToggle:function(){this.$refs.inputDialog.open()},dialogClose:function(){console.log("点击关闭")},dialogInputConfirm:function(e){var t=this;n.showLoading({title:"3秒后会关闭"}),setTimeout((function(){n.hideLoading(),console.log(e),t.value=e,t.$refs.inputDialog.close()}),3e3)},shareToggle:function(){this.$refs.share.open()}}};t.default=c}).call(this,o("bc2e")["default"],o("543d")["default"])},ed6f:function(e,t,o){"use strict";(function(e,t){var n=o("4ea4");o("522d"),o("a9ff");n(o("66fd"));var a=n(o("38ee"));e.__webpack_require_UNI_MP_PLUGIN__=o,t(a.default)}).call(this,o("bc2e")["default"],o("543d")["createPage"])}},[["ed6f","common/runtime","common/vendor"]]]);