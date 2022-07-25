import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes } from '@/types/data'
import { categoryItem, SubCategory, TopCategory } from '@/types/category'
import { topCategory } from '../constants'
import { useDelay } from '@/utils/hooks'
import { AnyARecord } from 'dns'
//其中有一个bug id没有回来全部为undefined 设置类名防止全部高亮
const defaultCategoryList = topCategory.map(item => { return { name: item, id: item } })
export default defineStore('category', {
    state() {
        return {
            categoryList: defaultCategoryList as categoryItem,
            topCategory: {} as TopCategory,
            subCategory: {} as SubCategory
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
        },
        //获取顶级分类
        async getTopCategory(id: string) {
            const res = await request.get<ApiRes<TopCategory>>('/category', {
                params: {
                    id,
                },
            })
            this.topCategory = res.data.result
        },
        //获取二级类目
        async getSubFilter(id: string) {
            const res = await request.get<ApiRes<SubCategory>>(
                '/category/sub/filter',
                {
                    params: {
                        id,
                    },
                }
            )
            this.subCategory = res.data.result
        }
    },
    getters: {}
})