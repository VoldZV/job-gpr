import {combineReducers, legacy_createStore} from "redux";
import {gprObjectsReducer} from "./reducers/gprObjectsReducer";


const rootReducer = combineReducers({
    gprObjects: gprObjectsReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)

