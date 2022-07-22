import { defineStore } from "pinia"
import request from '@/utils/request'
import { ApiRes } from '@/types/data'
import { BannerItem } from '@/types/home'
export default defineStore('home', {
    state() {
        return {
            bannerList: [] as BannerItem
        }
    },
    actions: {
        async getBannerList() {
            const res = await request.get<ApiRes<BannerItem>>('/home/banner')
            this.bannerList = res.data.result
        }
    },

})