import { createRouter, createWebHashHistory } from 'vue-router'
// 创建路由实例
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
const router = createRouter({
    // 路由地址的模式
    history: createWebHashHistory(),
    // 配置路由信息
    routes: [
        {
            path: '/', component: Layout,
            children: [
                { path: '/', component: Home },
                { path: '/category/:id', component: () => import('@/views/category/index.vue') },
                { path: '/category/sub/:id', component: () => import('@/views/category/sub.vue') },
                { path: '/goods/:id', component: () => import('@/views/goods/index.vue') }
            ]
        },
        {
            path: '/login', component: () => import('@/views/login/index.vue')
        },
        {
            path: '/ceShi', component: () => import('@/components/ceShi/index.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 }
    },
})
export default router

