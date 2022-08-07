import XtxSkeleton from '@/components/skeleton/index.vue'
import XtxCarousel from '@/components/carousel/index.vue'
import XtxMore from '@/components/more/index.vue'
import Bread from '@/components/Bread/index.vue'
import BreadItem from '@/components/Bread/Item.vue'
import XtxCity from '@/components/city/index.vue'
import XtxNumbox from '@/components/button/index.vue'
import XtxCheckbox from '@/components/checkbox/index.vue'
import XtxMessage from '@/components/message/index.vue'
import XtxDialog from '@/components/dialog/index.vue'
import XtxTabs from '@/components/tabs/pane.vue'
import XtxTabsPane from '@/components/tabs/index.vue'

// declare声明全局变量的时候添加
declare module 'vue' {
    export interface GlobalComponents {
        XtxSkeleton: typeof XtxSkeleton
        XtxCarousel: typeof XtxCarousel
        XtxMore: typeof XtxMore
        XtxBread: typeof XtxBread
        XtxBreadItem: typeof XtxBreadItem
        XtxCity: typeof XtxCity
        XtxNumbox: typeof XtxNumbox
        XtxButton: typeof XtxButton
        XtxCheckbox: typeof XtxCheckbox
        XtxMessage: typeof XtxMessage
        XtxDialog: typeof XtxDialog
        XtxTabs: typeof XtxTabs
        XtxTabsPane: typeof XtxTabsPane
    }
}
export { }