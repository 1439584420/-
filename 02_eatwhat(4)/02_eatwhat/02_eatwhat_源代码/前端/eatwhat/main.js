



import Vue from 'vue'
import App from './App'
import { VueJsonp } from './node_modules/vue-jsonp'
Vue.use(VueJsonp)
    import VueParticles from 'vue-particles'
    Vue.use(VueParticles)
Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from "uview-ui";
Vue.use(uView);

import store from '@/store';
// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
Vue.component('mescroll-body', MescrollBody)

const app = new Vue({
	store,
    ...App
})



app.$mount()
 // #ifdef VUE3
 import { createSSRApp } from 'vue'
 export function createApp() {
   const app = createSSRApp(App)
   return {
     app
   }
 }
 // #endif
