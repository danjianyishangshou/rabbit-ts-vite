// 城市列表类型
export type AreaList = {
    code: string
    level: number
    name: string
    areaList: AreaList[]
}


export type ChangeResult = {
    provinceCode: string,
    provinceName: string,
    cityCode: string,
    cityName: string,
    countyCode: string,
    countyName: string
}