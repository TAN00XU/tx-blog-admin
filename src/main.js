import Vue from 'vue'
import App from './App.vue'

// 路由
import router from "./router";
// vuex
import store from "./store";
// axios
import axios from "axios";
import VueAxios from "vue-axios";
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// css
import "./assets/css/index.css";
import "./assets/css/iconfont.css";
// 配置文件
import config from "@/assets/js/config";


Vue.prototype.config = config;
Vue.use(VueAxios, axios);
Vue.use(ElementUI);


Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
