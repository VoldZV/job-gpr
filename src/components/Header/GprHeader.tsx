import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {LoadFile} from "../LoadFileComponent/LoadFile";
import {useSelector} from "react-redux";
import {AppStateType} from "../../state/store";
import {FilterType} from "../../Types/state-types";


export const GprHeader: React.FC = () => {
    const uploadDate = useSelector<AppStateType, string>(state => state.gprObjects.uploadDate)
    const isInit = useSelector<AppStateType, boolean>(state => state.gprObjects.isInit)

    const filter = useSelector<AppStateType, FilterType>(state => state.gprObjects.filter)



    const date = new Date(uploadDate).toLocaleDateString()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    Фильтр данных {filter}
                    <Typography textAlign="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {isInit && `Выгрузка ГПР по объектам Лаборатории экспертиз от ${date}`}
                        {!isInit && `Загрузите данные ГПР - кнопка справа`}
                    </Typography>
                    <LoadFile/>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
