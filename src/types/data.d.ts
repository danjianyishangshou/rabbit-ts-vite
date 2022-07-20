/**
 * 后端返回值
 */
export interface ApiRes<T> {
    code: string
    msg: string
    result: T
}



