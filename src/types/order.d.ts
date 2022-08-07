// 订单列表总信息
export interface OrderListInfo {
    counts: number;
    pageSize: number;
    pages: number;
    page: number;
    countdown: number;
    // 应用订单列表别名
    items: OrderPayInfo[];
}