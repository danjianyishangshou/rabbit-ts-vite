// 引入vite配置打包内容
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 扩展配置组件name 但组件中的script标签中 要写点东西 注意script标签里也要配置name 属性
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// 引入path 设置别名 src改成@
import path from 'path'
// https://vitejs.dev/config/
//define定义 config配置
export default defineConfig({
  // 插件
  plugins: [vue({
    reactivityTransform: true//反应性转换 解决ts中prop给默认值的问题
  }), vueSetupExtend()],//vueSetupExtend 设置组件名字 
  // 解析
  resolve: {
    //别名
    alias: {
      // 采用node 读取src
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
            @import "@/assets/styles/variables.less";
            @import "@/assets/styles/mixins.less";
          `
      }
    }
  }
})

