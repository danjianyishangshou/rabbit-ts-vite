/**
 * goods模块
 */
export type CategoryGoods = {
    desc: string
    id: string
    name: string
    picture: string
    price: string
}[]

export type GoodItem = {
    desc: string
    id: string
    name: string
    picture: string
    price: string
}

/**
 * 商品模块的类型声明
 */
export type GoodsInfo = {
    id: string
    name: string
    spuCode: string
    desc: string
    price: string
    oldPrice: string
    discount: number
    inventory: number
    salesCount: number
    commentCount: number
    collectCount: number
    mainVideos: any[]
    videoScale: number
    mainPictures: string[]
    isPreSale: boolean
    isCollect?: any
    recommends?: any
    userAddresses?: any
    evaluationInfo?: any
    categories: {
        id: string
        name: string
        layer: number
    }[]
    specs: Spec[]
    skus: Sku[]
}
/**
 * Spec信息 每一种规格信息集合
 */
export type Spec = {
    name: string//规格名称
    values: SpecValue[]//规格中的子类
}

export interface SpecValue {
    name: string//规格分类的子集名称
    desc: string
    picture: string//图片 有图片显示图片 没有显示name
    selected: boolean//动态添加一个控制选中状态的按钮
    disabled: boolean//动态添加控制一个禁用按钮
}


/**
 * sku的类型
 */
export type Sku = {
    id: string//对应商品的id值 唯一标识
    inventory: number//sku的库存
    oldPrice: string//sku信息的旧价格
    price: string//新价格
    skuCode: string//用来构建路径字典判断
    specs: {
        name: string//具体所属的规格
        valueName: string//具体代表的信息
    }[]//sku代表的商品信息集合
}