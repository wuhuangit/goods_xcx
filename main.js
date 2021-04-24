import Vue from 'vue'
import App from './App'
import 'static/icont/iconfont.css'
import 'static/icont/iconfont.eot'
import 'static/icont/iconfont.svg'
import 'static/icont/iconfont.ttf'


Vue.config.productionTip = false
Vue.prototype.apis = 'https://www.qsgcs.cn'
App.mpType = 'app'


const app = new Vue({
    ...App
})
app.$mount()
