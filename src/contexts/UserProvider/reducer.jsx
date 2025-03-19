import { actionTypes } from "./actionTypes";
import { data } from "./data";

export const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.SET_UID: return {...state, uid: action.payload};
        case actionTypes.ADD_DATA: return {...state, user:{...action.payload}};
        case actionTypes.UPDATE_DATA: return {...state};
        case actionTypes.REMOVE_DATA: return data;
        case actionTypes.SET_LOADING: return {...state, loading: action.payload};
        case actionTypes.SET_ERROR: return {...state};
        default: return state;
    };
};
