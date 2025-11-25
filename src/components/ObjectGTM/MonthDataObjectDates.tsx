import React from 'react';
import Typography from "@mui/material/Typography";

type MonthDataObjectDatesPT = {
    beginning: string
    ending: string
    numberMonths: number
}
export const MonthDataObjectDates: React.FC<MonthDataObjectDatesPT> = ({beginning, ending, numberMonths}) => {
    return (
        <>
            <Typography bgcolor={"#ddd8de"} textAlign="center" variant="h6" component="div" sx={{flexGrow: 1}}>
                Начало {beginning}
            </Typography>
            <Typography bgcolor={"#ddd8de"} textAlign="center" variant="h6" component="div" sx={{flexGrow: 1}}>
                Конец {ending}
            </Typography>
            <Typography bgcolor={"#ddd8de"} textAlign="center" variant="h6" component="div" sx={{flexGrow: 1}}>
                Всего {numberMonths} мес. работы
            </Typography>
        </>
    );
};