import { CategoryGoods } from './goods'
/**
 * 商品一级分类模块
 */
export type categoryItem = {
    id: string
    name: string
    picture: string
    children: categoryItem
    goods: CategoryGoods
    open: boolean
}[]


