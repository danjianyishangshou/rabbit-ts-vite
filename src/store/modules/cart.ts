import { CartItem } from '@/types/cart';
import { ApiRes } from '@/types/data';
import request from '@/utils/request';
import { defineStore } from 'pinia'
import useStore from '..';
/** @type {*} */
const useCartStore = defineStore('cart', {


    state() {
        return {
            list: [] as CartItem[]
        }
    },
    persist: {
        key: 'rabbit-cart-c'
    },
    actions: {
        /**
         * 加入购物车
         * @param data 
         */
        async addCart(data: { skuId: string; count: number }) {
            // 区分是否登录
            if (this.isLogin) {
                await request.post('/member/cart', data)
                this.getCartList()
            } else {
                // 找到原本购物车有没有这个商品 有就累加 没有就添加
                const goods = this.list.find(item => item.skuId === data.skuId)
                if (goods) {
                    // 有就累加
                    goods.count += data.count
                } else {
                    // 没有就添加
                    this.list.unshift(data as CartItem)
                }
            }
        },
        /**
         *  获取购物车列表
         */
        async getCartList() {
            if (this.isLogin) {
                const res = await request.get<ApiRes<CartItem[]>>('/member/cart')
                this.list = res.data.result
            } else {
                // 更新本地购物车 防止加个变化
                this.list.forEach(async item => {
                    const skuId = item.skuId
                    const res = await request.get<ApiRes<CartItem>>(`/goods/stock/${skuId}`)
                    const newCartInto = res.data.result
                    // item = newCartInto
                    // 更新商品现价
                    item.nowPrice = newCartInto.nowPrice
                    // 更新商品库存
                    item.stock = newCartInto.stock
                    // 更新商品是否有效
                    item.isEffective = newCartInto.isEffective
                })
            }
        },
        /**
         * 删除购物车商品
         * @param skuIds 
         */
        async deleteCartList(skuIds: string[]) {
            if (this.isLogin) {
                await request.delete('/member/cart', { data: { ids: skuIds } })
                this.getCartList()
            } else {
                this.list = this.list.filter(item => !skuIds.includes(item.skuId))
            }
        },
        /**
         * 修改购物车数据
         * @param skuId 
         * @param data 
         */
        async updateCart(skuId: string, data: { selected?: boolean, count?: number }) {
            if (this.isLogin) {
                await request.put(`/member/cart/${skuId}`, data)
                this.getCartList()
            } else {
                const goods = this.list.find(item => item.skuId === skuId)
                if (data.count !== undefined) {
                    goods!.count = data.count
                }
                if (data.selected !== undefined) {
                    goods!.selected = data.selected
                }
            }
        },
        // 修改全选或者全不选
        async updateCartAllSelected(isSelected: boolean) {
            if (this.isLogin) {
                await request.put('/member/cart/selected', {
                    selected: isSelected,
                })
                // 获取购物车列表
                this.getCartList()
            } else {
                this.list.forEach(item => item.selected = isSelected)
            }
        },
        /**
         * 判断怎么登录
         */
        loginOut() {
            this.list = []
        },
        async mergeLocalCart() {
            const data = this.list.map(item => {
                return {
                    skuId: item.skuId,
                    selected: item.selected,
                    count: item.count
                }
            })
            await request.post('/member/cart/merge', data)
            this.getCartList()
        }
    },
    getters: {
        /**
         * 获取有效的列表信息
         * @returns 
         */
        effectiveList(): CartItem[] {
            return this.list.filter(item => item.stock > 0 && item.isEffective)
        },
        /**
         * 获取总数
         * @returns 
         */
        effectiveListCount(): number {
            return this.effectiveList.reduce((sum, item) => sum += item.count, 0)
        },
        /**
         * 获取总价
         * @returns 
         */
        effectiveListPrice(): string {
            return this.effectiveList.reduce((sum, item) => sum += item.count * +item.nowPrice, 0).toFixed(2)
        },
        /**
         * 计算出全选按钮
         */
        isAllSelected(): boolean {
            return this.effectiveList.every(item => item.selected) && this.effectiveList.length !== 0
        },
        /**
         * 计算出选中的商品
         * @returns 
         */
        selectedList(): CartItem[] {
            return this.effectiveList.filter(item => item.selected)
        },
        /**
       * 获取选中的总数
       * @returns 
       */
        selectedListCount(): number {
            return this.selectedList.reduce((sum, item) => sum += item.count, 0)
        },
        /**
         * 获取选中的总价
         * @returns 
         */
        selectedListPrice(): string {
            return this.selectedList.reduce((sum, item) => sum += item.count * +item.nowPrice, 0).toFixed(2)
        },
        /**
         * 区分是否登录
         */
        isLogin(): boolean {
            const { user } = useStore()
            // return Boolean(user.profile.token)
            return !!user.profile.token
        }

    }
})
export default useCartStore