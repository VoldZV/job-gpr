import React from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/store";
import {FilterType, GPRtype,} from "./Types/state-types";
import {Container, Grid} from "@mui/material";
import {GprHeader} from "./components/Header/GprHeader";
import {GprObject} from "./components/ObjectGTM/GprObject";
import {object} from "prop-types";


function App() {

    const dispatch = useDispatch()
    const gprState = useSelector<AppStateType, GPRtype>(state => state.gprObjects)

    const filter = useSelector<AppStateType, FilterType>(state => state.gprObjects.filter)

    const objectsDataForRender = [...gprState.gprObjects].filter(object => {
        const monthData =  object.data.find(data => filter && data.date.startsWith(filter))
        return !!monthData
    })


    return (
        <>
            <GprHeader/>
            <Container style={{paddingTop: "20px"}}>
                <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {objectsDataForRender.map((object,index) => (
                            <GprObject key={index} index={index} gprObject={object}/>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default App;
