// 引入user模块仓库
import useUserStore from './modules/user'
import useCategoryStore from './modules/category'
// 配置整合仓库
const useStore = () => {
    return {
        user: useUserStore(),
        category: useCategoryStore()
    }
}
// 导出仓库
export default useStore