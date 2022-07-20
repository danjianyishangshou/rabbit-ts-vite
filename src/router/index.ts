import { createRouter, createWebHashHistory } from 'vue-router'
// 创建路由实例
import Layout from '@/views/layout/index.vue'
const router = createRouter({
    // 路由地址的模式
    history: createWebHashHistory(),
    // 配置路由信息
    routes: [
        {
            path: '/', component: Layout
        },
        {
            path: '/login', component: () => import('@/views/login/index.vue')
        }
    ]
})
export default router

