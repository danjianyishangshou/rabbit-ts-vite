import { createApp } from 'vue'
import App from './App.vue'
// 引入第三方normalize包处理各个浏览器兼容性问题
import 'normalize.css'
import '@/assets/styles/common.less'
//引入路由并且通过插件挂载
import router from '@/router/index'
// 引入pinia
import { createPinia } from 'pinia'
// 创建pinia实例并且通过插件挂载
const pinia = createPinia()
// 在vue实例上挂载插件并将vue挂载到根标签上
createApp(App).use(router).use(pinia).mount('#app')


