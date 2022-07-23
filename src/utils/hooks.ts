import { useIntersectionObserver } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 封装的scrollTOP小插件 注意@vueuse/core的库中都是以对象的形式return 所以自己封装的也是如此
 * 避免的常量不可改变的问题
 */
export const useScroll = () => {
    let y = ref(0)
    const onscroll = () => {
        y.value = document.documentElement.scrollTop
    }
    // 创建
    onMounted(() => {
        window.addEventListener('scroll', onscroll)
    })
    //  销毁
    onUnmounted(() => {
        window.removeEventListener('scroll', onscroll)
    })
    return {
        y
    }
}

/**
 * 延时调试的工具
 * @param time 
 * @returns 
 */
export const useDelay = (time = 2000) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

/**
 * 封装组件懒加载函数
 * @param callback 传入函数自动调用
 * @returns 
 * 组件数据懒加载与图片数据懒加载原理一样
 * 都是在元素到达适口范围的时候发送ajax请求
 */
export const useLazyData = (callback: () => void) => {
    const target = ref(null)
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
        if (isIntersecting) {
            callback()
            stop()
        }
    }, {
        threshold: 0//阀值 解决bug 
        // threshold 容器和可视区交叉的占比（进入的面积/容器完整面试） 取值，0-1 之间，默认比0大，所以需要滚动较多才能触发进入可视区域事件。
    })
    return {
        target
    }
}