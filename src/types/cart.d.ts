/**
 * 单个购物车商品
 */
export interface CartItem {
    id: string
    skuId: string
    name: string
    attrsText: string
    picture: string
    price: string
    nowPrice: string
    nowOriginalPrice?: string
    selected: boolean
    stock: number
    count: number
    isEffective: boolean
    // discount?: any;
    isCollect?: boolean
    postFee?: number
}
/**
 * 支付订单数据
 */
export interface OrderPayInfo {
    id: string
    createTime: string
    payType: number
    orderState: number
    payLatestTime: string
    countdown: number
    postFee: number
    payMoney: number
    payChannel: number
    totalMoney: number
    totalNum: number
    deliveryTimeType: number
    receiverContact: string
    receiverMobile: string
    provinceCode: string
    cityCode: string
    countyCode: string
    receiverAddress: string
    payTime?: any
    consignTime?: any
    endTime?: any
    closeTime?: any
    evaluationTime?: any
    skus: {
        id: string
        spuId: string
        name: string
        quantity: number
        image: string
        realPay: number
        curPrice: number
        totalMoney?: any
        properties: {
            propertyMainName: string
            propertyValueName: string
        }[]
        attrsText: string
    }[]
    arrivalEstimatedTime?: any
}

