import { actionTypes } from "./actionTypes";

export function reducer(state, action){
    switch(action.type){
        case actionTypes.SET_TOTAL_QUANTITY: return {...state, totalQuantity: action.payload };
        case actionTypes.SET_FINAL_PRICE: return {...state, finalPrice: action.payload };
        case actionTypes.ADD_ITEMS: return {...state, items: action.payload};
        case actionTypes.RESET: return {...state, items: [], totalQuantity: 0, finalPrice: 0,};
        default: return state;
    };
};
