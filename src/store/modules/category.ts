import { defineStore } from 'pinia'
import request from '@/utils/request'
export default defineStore('category', {
    state() {
        return {
            categoryList: [] as categoryItem
        }
    },
    actions: {
        async getAllCategory() {
            const res = await request.get<ApiRes<categoryItem>>('/home/category/head')
            this.categoryList = res.data.result
        }
    },
    getters: {}
})