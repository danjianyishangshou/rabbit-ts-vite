// 统一的注册所有的全局组件
import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from '@/components/more/index.vue'
import Bread from '@/components/Bread/index.vue'
import BreadItem from '@/components/Bread/Item.vue'
import XtxCity from '@/components/city/index.vue'
import XtxNumbox from '@/components/numBox/index.vue'
import XtxButton from '@/components/button/index.vue'

// 引入第三方hooks工具
import { useIntersectionObserver } from '@vueuse/core'
import defaultImg from '@/assets/images/200.png'
// 导入App类型
import { App } from 'vue'
export default {
    install(app: App) {
        app.component(XtxSkeleton.name, XtxSkeleton)
        app.component(XtxCarousel.name, XtxCarousel)
        app.component(XtxMore.name, XtxMore)
        app.component(Bread.name, Bread)
        app.component(BreadItem.name, BreadItem)
        app.component(XtxCity.name, XtxCity)
        app.component(XtxNumbox.name, XtxNumbox)
        app.component(XtxButton.name, XtxButton)
        // 创建全局自定义指令
        app.directive('lazy', {
            // vue3 封装自定义指令 采用的是在mounted钩子里挂载
            // vue2 中是使用固定语法 inserted(){}
            mounted(el: HTMLImageElement, bind) {
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        if (isIntersecting) {
                            el.src = bind.value || defaultImg
                        }
                    },
                )
            }
        })
    },
}

