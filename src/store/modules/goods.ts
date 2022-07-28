import { defineStore } from 'pinia'
import { GoodsInfo } from '@/types/goods'
import request from '@/utils/request'
import { ApiRes } from '@/types/data'
export default defineStore('goods', {
    state() {
        return {
            goodsInfo: {} as GoodsInfo
        }
    },
    actions: {
        async getGoodsInfo(id: string) {
            const res = await request.get<ApiRes<GoodsInfo>>('/goods', {
                params: {
                    id,
                },
            })
            this.goodsInfo = res.data.result
        },
        resetGoodsInfo() {
            this.goodsInfo = {} as GoodsInfo
        }
    },
    getters: {}
})