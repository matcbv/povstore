import { actionTypes } from "./actionTypes";

export const reducer = (state, action) => {
    switch(action.type){
        case(actionTypes.ADD_DATA): return {...state, ...action.payload};
        case(actionTypes.UPDATE_DATA): return {...state};
        case(actionTypes.REMOVE_DATA): return {};
        default: return state;
    };
};
