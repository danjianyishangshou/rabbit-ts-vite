import { CartItem } from '@/types/cart';
import { ApiRes } from '@/types/data';
import request from '@/utils/request';
import { defineStore } from 'pinia'
/** @type {*} */
const useCartStore = defineStore('cart', {

    state() {
        return {
            list: [] as CartItem[]
        }
    },
    actions: {
        /**
         * 加入购物车
         * @param data 
         */
        async addCart(data: { skuId: string; count: number }) {
            await request.post('/member/cart', data)
            this.getCartList()
        },
        /**
         *  获取购物车列表
         */
        async getCartList() {
            const res = await request.get<ApiRes<CartItem[]>>('/member/cart')
            this.list = res.data.result
        },
        async deleteCartList(skuIds: string[]) {
            await request.delete('/member/cart', { data: { ids: skuIds } })
            this.getCartList()
        }
    },
    getters: {
        // 获取有效的列表信息
        effectiveList(): CartItem[] {
            return this.list.filter(item => item.stock > 0 && item.isEffective)
        },
        // 获取总数
        effectiveListCount(): number {
            return this.effectiveList.reduce((sum, item) => sum += item.count, 0)
        },
        // 获取总价
        effectiveListPrice(): string {
            return this.effectiveList.reduce((sum, item) => sum += item.count * +item.nowPrice, 0).toFixed(2)
        }
    }
})
export default useCartStore