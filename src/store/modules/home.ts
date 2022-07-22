import { defineStore } from "pinia"
import request from '@/utils/request'
import { ApiRes } from '@/types/data'
import { BannerItem, NewGoodItem, HotGoods } from '@/types/home'
export default defineStore('home', {
    state() {
        return {
            bannerList: [] as BannerItem,
            newGoods: [] as NewGoodItem,
            hotGoods: [] as HotGoods
        }
    },
    actions: {
        /**
         * 获取轮播图信息
         */
        async getBannerList() {
            const res = await request.get<ApiRes<BannerItem>>('/home/banner')
            this.bannerList = res.data.result
        },
        /**
         * 获取新鲜好物信息
         */
        async getNewGoodsList() {
            const res = await request.get<ApiRes<NewGoodItem>>('/home/new')
            this.newGoods = res.data.result
        },
        /**
       * 获取人气推荐信息
       */
        async getHotGoodsList() {
            const res = await request.get<ApiRes<HotGoods>>('/home/hot')
            this.hotGoods = res.data.result
        }
    },

})