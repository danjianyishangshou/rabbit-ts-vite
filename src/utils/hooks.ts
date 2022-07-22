/**
 * 封装的scrollTOP小插件 注意@vueuse/core的库中都是以对象的形式return 所以自己封装的也是如此
 * 避免的常量不可改变的问题
 */
import { onMounted, onUnmounted, ref } from 'vue'
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
export const Delay = (time = 2000) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}