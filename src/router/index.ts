import { createRouter, createWebHashHistory } from 'vue-router'
// 创建路由实例
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import useStore from '@/store'
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
                { path: '/goods/:id', component: () => import('@/views/goods/index.vue') },
                {
                    path: '/cart', component: () => import('@/views/cart/index.vue')
                },
                {
                    path: '/member/checkout',
                    component: () => import('@/views/member/pay/checkout.vue')
                },
                {
                    path: '/member/pay',
                    component: () => import('@/views/member/pay/index.vue')
                },
                {
                    path: '/pay/callback',
                    component: () => import('@/views/member/pay/callback.vue')
                },
                {
                    path: '/member',
                    component: () => import('@/views/member/layout/index.vue'),
                    children: [
                        {
                            path: '',
                            component: () => import('@/views/member/home/index.vue')
                        },
                        {
                            path: 'order',
                            component: () => import('@/views/member/order/index.vue')
                        }
                    ]
                }
            ]
        },
        {
            path: '/login', component: () => import('@/views/login/index.vue')
        },
        {
            path: '/login/callback', component: () => import('@/views/login/callback.vue')
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
// 路由前置守卫
router.beforeEach((to, from, next) => {
    const { cart } = useStore()
    // 判断是否登录 登录直接放行
    if (cart.isLogin) {
        next()
    } else {
        // 没有登录 看看去哪里 去支付页 拦截其去登录页
        if (to.path.includes('/member')) {
            // 引导其去登录页 要设置一个跳转参数 用于登录后的跳转 
            // 通过to.fullPath获取当前路径 在登录的时候通过route.query 获取到信息
            next({
                path: '/login',
                query: {
                    redirectUrl: to.fullPath
                }
            })
        } else {
            // 没有去权限页 直接放行
            next()
        }
    }
})
export default router

