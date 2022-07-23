import { defineStore } from "pinia"
import request from '@/utils/request'
import { ApiRes } from '@/types/data'
import { BannerItem, NewGoodItem, HotGoods, BrandGoods, HomeProduct, Special } from '@/types/home'
export default defineStore('home', {
    state() {
        return {
            bannerList: [] as BannerItem,
            newGoods: [] as NewGoodItem,
            hotGoods: [] as HotGoods,
            brandGoods: [] as BrandGoods,
            productList: [] as HomeProduct,
            specialList: [] as Special,
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
        },
        /**
         * 热门品牌
         */
        async getBrandList() {
            const res = await request.get<ApiRes<BrandGoods>>('/home/brand')
            this.brandGoods = res.data.result
        },
        /**
         * 更多商品推荐
         */
        async getProductList() {
            const res = await request.get<ApiRes<HomeProduct>>('/home/goods')
            this.productList = res.data.result
        },
        async getSpecialList() {
            const res = await request.get<ApiRes<Special>>('/home/special')
            this.specialList = res.data.result
        }
    },

})