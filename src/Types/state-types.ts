export type GPRtype = {
    isInit: boolean
    filter: FilterType
    uploadDate: string
    gprObjects: GPRobjectDataType[]
    engineersCosts: EngineersCostsType
}

export type FilterType = null | string


export type EngineersCostsType = {
    p: number[]
    k: number[]
    v: number[]
}

export type GPRobjectDataType = {
    name: string
    data: DataType[]
    lastDateColumnNumber: number
}

export type DataType = {
    contractPrices: PricesType
    date: string
    timeResources: TimeResourcesType
    workPrices: PricesType
}

export type TimeResourcesType = {
    firstHalf: HalfResourcesType
    lastHalf: HalfResourcesType
}

export type HalfResourcesType = {
    fact: number[]
    project: number[]
}


export type PricesType = {
    firstHalf: number
    lastHalf: number
}

