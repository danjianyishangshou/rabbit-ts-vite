// 引入user模块仓库
import useUserStore from './modules/user'
import useCategoryStore from './modules/category'
import useHomeStore from './modules/home'
import useGoodsStore from './modules/goods'
// 配置整合仓库
const useStore = () => {
    return {
        user: useUserStore(),
        category: useCategoryStore(),
        home: useHomeStore(),
        goods: useGoodsStore()
    }
}
// 导出仓库
export default useStore