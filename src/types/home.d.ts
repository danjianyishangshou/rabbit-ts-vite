/**
 * 轮播图类型
 */
export type BannerItem = {
    hrefUrl: string
    id: string
    imgUrl: string
    type: string
}[]

/**
 * 新鲜好物
 */
export type NewGoodItem = {
    desc: string
    id: string
    name: string
    picture: string
    price: string
}[]

/**
 * 人气推荐
 */
export type HotGoods = {
    id: string
    picture: string
    title: string
    alt: string
}[]