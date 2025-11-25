import React from 'react';
import Typography from "@mui/material/Typography";

type GprHeaderPT = {
    title: string
    index: number
}
export const GprHeader: React.FC<GprHeaderPT> = ({index,title}) => {

    return (
        <Typography bgcolor={"#cd82da"} textAlign="center" variant="h6" component="div" sx={{flexGrow: 1}}>
            {index + 1}) {title}
        </Typography>
    );
};