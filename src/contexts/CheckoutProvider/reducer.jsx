import { actionTypes } from "./actionTypes";

export function reducer(state, action){
    switch(action.type){
        case actionTypes.INCREMENT: return {...state, index: state.index + 1};
        case actionTypes.DECREMENT: return state.index <= 0 ? state : {...state, index: state.index - 1};
        case actionTypes.ADD_ITEMS: return {...state, items: action.payload};
        case actionTypes.REMOVE_ITEMS: return {...state, items: []};
        default: return state;
    };
};
