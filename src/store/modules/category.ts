import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes } from '@/types/data'
import { categoryItem } from '@/types/category'
import { topCategory } from '../constants'
const defaultCategoryList = topCategory.map(item => { return { name: item } })
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