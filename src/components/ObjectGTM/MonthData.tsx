import React, {useState} from 'react';
import {DataType, EngineersCostsType} from "../../Types/state-types";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import {calcEffectiveCost} from "../../utils/utils";
import {useSelector} from "react-redux";
import {AppStateType} from "../../state/store";
import {MonthDataTable} from "./MonthDataTable";

type MonthDataPT = {
    monthData: DataType
}
export const MonthData: React.FC<MonthDataPT> = ({monthData}) => {
    const [isHiddenData, setIsHiddenData] = useState<boolean>(false)
    const engineersCosts = useSelector<AppStateType, EngineersCostsType>(state => state.gprObjects.engineersCosts)

    const toggleHidden = () => {
        setIsHiddenData(state => !state)
    }

    const costEffectiveSumFirstHalf = !monthData.contractPrices.firstHalf || !monthData.workPrices.firstHalf ? 0 : Math.round(monthData.contractPrices.firstHalf - monthData.workPrices.firstHalf)
    const costEffectiveSumLastHalf = !monthData.contractPrices.lastHalf || !monthData.workPrices.lastHalf ? 0 : Math.round(monthData.contractPrices.lastHalf - monthData.workPrices.lastHalf)
    const costEffectiveMonth = Math.round(costEffectiveSumFirstHalf + costEffectiveSumLastHalf)

    const isEffectiveFirstHalf = costEffectiveSumFirstHalf > 0
    const isEffectiveLastHalf = costEffectiveSumLastHalf > 0
    const isEffectiveMonth = costEffectiveMonth > 0

    const rentColor = costEffectiveMonth === 0 ? "#d3cf79" : isEffectiveMonth ? "#79d39e" : "#ef9494"
    const rentColorFirstHalf = costEffectiveSumFirstHalf === 0 ? "#ffffff" : isEffectiveFirstHalf ? "#79d39e" : "#ef9494"
    const rentColorLastHalf = costEffectiveSumLastHalf === 0 ? "#ffffff" : isEffectiveLastHalf ? "#79d39e" : "#ef9494"

    return (<>
        <Typography onClick={toggleHidden} bgcolor={rentColor} textAlign="center" variant="h6"
                    component="div" sx={{flexGrow: 1}}
                    style={{cursor: "pointer"}}
        >
            Рентабельность за {monthData.date.substring(0, 7)}
        </Typography>
        {isHiddenData && <MonthDataTable monthData={monthData}
                                         rentColors={{rentColor, rentColorFirstHalf, rentColorLastHalf}}
                                         costEffectives={{costEffectiveSumFirstHalf, costEffectiveSumLastHalf}}
        />}
        <Typography bgcolor={rentColor} textAlign="center" variant="h6"
                    component="div" sx={{flexGrow: 1}}
        >
            {(!monthData.workPrices.firstHalf && !monthData.workPrices.lastHalf) ? "данные отсутствуют" : costEffectiveMonth}
        </Typography>
    </>)
};