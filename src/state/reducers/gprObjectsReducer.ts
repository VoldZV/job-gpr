import {GPRtype} from "../../Types/state-types";

const initialState: GPRtype = {
    isInit: false,
    filter: '2025-10',
   uploadDate: '',
   engineersCosts: {
       p: [],
       v: [],
       k: []
   },
    gprObjects: []
}

export const gprObjectsReducer = (state = initialState, action: LoadGprObjectsReducerAT): GPRtype => {
    switch (action.type) {
        case 'gprObjects/loadData':
            return {
                ...state,
                ...action.newState,
                isInit: true
            }
        default:
            return state
    }
}

export type LoadGprObjectsReducerAT = ReturnType<typeof loadDataAC>

export const loadDataAC = (newState: GPRtype) => ({
    type: 'gprObjects/loadData',
    newState
} as const)
