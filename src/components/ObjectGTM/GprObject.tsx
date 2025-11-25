import React, {useState} from 'react';
import {Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {EngineersCostsType, FilterType, GPRobjectDataType, GPRtype, HalfResourcesType} from "../../Types/state-types";
import {useSelector} from "react-redux";
import {AppStateType} from "../../state/store";
import {calcEffectiveCost} from "../../utils/utils";
import {GprHeader} from "./GprHeader";
import {MonthDataObjectDates} from "./MonthDataObjectDates";
import {MonthData} from "./MonthData";

type GprObjectPropsType = {
    index: number
    gprObject: GPRobjectDataType
}
export const GprObject: React.FC<GprObjectPropsType> = ({gprObject, index}) => {
    const beginning = gprObject.data[0].date.substring(0, 7)

    const ending = gprObject.data[gprObject.data.length - 1].date.substring(0, 7)

    const filter = useSelector<AppStateType, FilterType>(state => state.gprObjects.filter)
    const monthData = gprObject.data.find(data => filter && data.date.startsWith(filter))

    return (
        monthData ?
            <Grid item sx={{flexGrow: 1}} xs={2} sm={4} md={6}>
                <Paper elevation={10} style={{padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px',}}>
                    <GprHeader title={gprObject.name} index={index}/>
                    <MonthDataObjectDates beginning={beginning} ending={ending} numberMonths={gprObject.data.length}/>
                    <MonthData monthData={monthData}/>
                </Paper>
            </Grid>
            :
            <>Ошибка</>
    );
};