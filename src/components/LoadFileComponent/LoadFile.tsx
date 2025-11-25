import React, {ChangeEvent} from 'react';
import Button from "@mui/material/Button";
import PublishIcon from '@mui/icons-material/Publish';
import {useDispatch} from "react-redux";
import {loadDataAC} from "../../state/reducers/gprObjectsReducer";
import {GPRtype} from "../../Types/state-types";
export const LoadFile = () => {
    const dispatch = useDispatch()

    function loadFileHandler (event: ChangeEvent<HTMLInputElement>) {
        if(!event.target.files) return
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function ()  {


            const newState = JSON.parse(reader.result as string) as GPRtype
            console.log(newState)
            dispatch(loadDataAC(newState))
        }

        reader.onerror = function (event)  {
            console.log("ошибка")
        }

        event.target.value = ''
    }


    return (
        <div>
            <Button
                variant="contained"
                component="label"
                color="secondary"
                endIcon={<PublishIcon/>}
            >
                Upload File
                <input type="file" onChange={loadFileHandler} hidden={true}/>
            </Button>
        </div>
    );
};