import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useSelector} from "react-redux";
import {AppStateType} from "../../state/store";
import {DataType, EngineersCostsType, HalfResourcesType} from "../../Types/state-types";
import {calcEffectiveCost} from "../../utils/utils";


type MonthDataTablePT = {
    rentColors: RentColorsType
    monthData: DataType
    costEffectives: CostEffectiveSumHalfType
}

type RentColorsType = {
    rentColor: string
    rentColorFirstHalf: string
    rentColorLastHalf: string
}

type CostEffectiveSumHalfType = {
    costEffectiveSumFirstHalf: number
    costEffectiveSumLastHalf: number
}

function createData(
    name: string,
    firstHalf: HalfType,
    lastHalf: HalfType,
) {
    return {name, firstHalf, lastHalf};
}

type  HalfType = {
    color: string,
    value: number,
}

const rowsHoursData = [
    "П1 план",
    "П2 план",
    "П3 план",
    "П1 факт",
    "П2 факт",
    "П3 факт",
    "K1с план",
    "K2с план",
    "K3с план",
    "K1с факт",
    "K2с факт",
    "K3с факт",
    "K1o план",
    "K2o план",
    "K3o план",
    "K1o факт",
    "K2o факт",
    "K3o факт",
    "В1п план",
    "В2п план",
    "В3п план",
    "В1п факт",
    "В2п факт",
    "В3п факт",
    "В1к план",
    "В2к план",
    "В3к план",
    "В1к факт",
    "В2к факт",
    "В3к факт",
];

const createCombinedHoursArray = (halfTimeResources: HalfResourcesType): number[] => {
    const result = []
    for (let i = 0; i < 15; i= i+3) {
        for(let k = i; k < i + 3; k++) {
            result.push(halfTimeResources.project[k])
        }
        for(let j = i; j < i + 3; j++) {
            result.push(halfTimeResources.fact[j])
        }
    }
    return result
}
export const MonthDataTable: React.FC<MonthDataTablePT> = ({rentColors, monthData, costEffectives}) => {
    const {rentColor, rentColorFirstHalf, rentColorLastHalf} = rentColors
    const {costEffectiveSumFirstHalf, costEffectiveSumLastHalf} = costEffectives

    const engineersCosts = useSelector<AppStateType, EngineersCostsType>(state => state.gprObjects.engineersCosts)

    //цена договора
    const contractPricesFirstHalf = Math.round(monthData.contractPrices.firstHalf)
    const contractPricesLastHalf = Math.round(monthData.contractPrices.lastHalf)

    // себестоимость факт
    const workPricesFirstHalf = Math.round(monthData.workPrices.firstHalf)
    const workPricesLastHalf = Math.round(monthData.workPrices.lastHalf)
    //вычисление теоретической стоимости
    const planCostFirstHalf = calcEffectiveCost(engineersCosts, monthData.timeResources.firstHalf.project)
    const planCostLastHalf = calcEffectiveCost(engineersCosts, monthData.timeResources.lastHalf.project)
    // теоретическая рентабельность
    const planEffectiveCostFirstHalf = !monthData.contractPrices.firstHalf || !planCostFirstHalf ? 0 :  Math.round(monthData.contractPrices.firstHalf - planCostFirstHalf)
    const planEffectiveCostLastHalf = !monthData.contractPrices.lastHalf || !planCostLastHalf ? 0 : Math.round(monthData.contractPrices.lastHalf - planCostLastHalf)
    // цвета для теоретической рентабельности
    const isEffectivePlanFirstHalf = planEffectiveCostFirstHalf > 0
    const isEffectivePlanLastHalf = planEffectiveCostLastHalf > 0
    const planRentColorFirstHalf = planEffectiveCostFirstHalf === 0 ? "#ffffff" : isEffectivePlanFirstHalf ? "#79d39e" : "#ef9494"
    const planRentColorLastHalf = planEffectiveCostLastHalf === 0 ? "#ffffff" : isEffectivePlanLastHalf ? "#79d39e" : "#ef9494"

    const rows = [
        createData('Цена договора', {color: '', value: contractPricesFirstHalf}, {color: '', value: contractPricesLastHalf}),
        createData('Цена выезда', {color: '', value: workPricesFirstHalf}, {color: '', value: workPricesLastHalf}),
        createData('Цена плановая', {color: '', value: planCostFirstHalf}, {color: '', value: planCostLastHalf}),
        createData('Рент. выезда', {color: rentColorFirstHalf, value: costEffectiveSumFirstHalf}, {color: rentColorLastHalf, value: costEffectiveSumLastHalf}),
        createData('Рент.теоретическая', {color: planRentColorFirstHalf, value: planEffectiveCostFirstHalf}, {color: planRentColorLastHalf, value: planEffectiveCostLastHalf}),
    ];

    const combinedHoursFirsHalf:number[] = createCombinedHoursArray(monthData.timeResources.firstHalf)
    const combinedHoursLastHalf:number[] = createCombinedHoursArray(monthData.timeResources.lastHalf)



    const rowsHours = rowsHoursData.map((el,index) => {
        const firstHalfValue = Math.round(combinedHoursFirsHalf[index]*24)
        const lastHalfValue = Math.round(combinedHoursLastHalf[index]*24)
        return createData(el, {color: '', value: firstHalfValue}, {color: '', value: lastHalfValue})
    })

    return (
        <TableContainer style={{maxHeight: "330px"}} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow style={{backgroundColor: "#b0b2b0"}}>
                        <TableCell>Характеристика</TableCell>
                        <TableCell align="right">Первая половина</TableCell>
                        <TableCell align="right">Вторая половина</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell style={{backgroundColor: row.firstHalf.color}}
                                       align="right">
                                {row.firstHalf.value || "-"}
                            </TableCell>
                            <TableCell style={{backgroundColor: row.lastHalf.color}}
                                       align="right">
                                {row.lastHalf.value || "-"}
                            </TableCell>
                        </TableRow>
                    ))}
                    {
                        rowsHours.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell style={{backgroundColor: row.firstHalf.color}}
                                           align="right">
                                    {row.firstHalf.value || "-"}
                                </TableCell>
                                <TableCell style={{backgroundColor: row.lastHalf.color}}
                                           align="right">
                                    {row.lastHalf.value || "-"}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};