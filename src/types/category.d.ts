import { CategoryGoods, GoodItem } from './goods'
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

// 顶级分类类型
export type TopCategory = {
    id: string
    name: string
    picture: string
    children: Children[]
}

// 子类
interface Children {
    id: string;
    name: string;
    picture: string;
    parentId?: any;
    parentName?: any;
    goods: {
        id: string;
        name: string;
        desc: string;
        price: string;
        picture: string;
        discount?: any;
        orderNum: number;
    }[];
    categories?: any;
    brands?: any;
    saleProperties?: any;
}


/**
 * 二级类目
 */
export type SaleProperty = {
    id: string
    name: string
    properties: {
        id: string
        name: string
    }[]
}
/**
 * 二级类目
 */
export type SubCategory = {
    id: string
    name: string
    picture?: any
    parentId: string
    parentName: string
    brands: {
        id: string
        name: string
        nameEn: string
        logo: string
        picture: string
        type?: any
        desc: string
        place: string
    }[]
    saleProperties: SaleProperty[]
    goods: GoodItem[]
}

