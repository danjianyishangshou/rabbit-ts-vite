import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes } from '@/types/data'
import { categoryItem } from '@/types/category'
import { topCategory } from '../constants'
import { useDelay } from '@/utils/hooks'
//其中有一个bug id没有回来全部为undefined 设置类名防止全部高亮
const defaultCategoryList = topCategory.map(item => { return { name: item, id: item } })
export default defineStore('category', {
    state() {
        return {
            categoryList: defaultCategoryList as categoryItem
        }
    },
    actions: {
        async getAllCategory() {
            const res = await request.get<ApiRes<categoryItem>>('/home/category/head')
            res.data.result.forEach(item => item.open = false)
            // await useDelay()// 延时等一等
            this.categoryList = res.data.result
        },
        show(id: string) {
            const category = this.categoryList.find((item) => item.id === id)
            category!.open = true
        },
        hide(id: string) {
            const category = this.categoryList.find((item) => item.id === id)
            category!.open = false
        }
    },
    getters: {}
})