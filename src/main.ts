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
// 引入pinia持久化工具 并使用use挂载
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 挂载持久化工具
pinia.use(piniaPluginPersistedstate)
// 引入全局组件
import XtxUI from './components'
// 在vue实例上挂载插件并将vue挂载到根标签上
createApp(App).use(router).use(pinia).use(XtxUI).mount('#app')


