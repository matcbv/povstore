import { actionTypes } from "./actionTypes";

export function reducer(state, action){
    switch(action.type){
        case actionTypes.SET_ACTIVE_GENDER: return {...state, activeGender: action.payload};
        case actionTypes.SET_ACTIVE_CATEGORY: return {...state, activeCategory: action.payload};
        case actionTypes.SET_ACTIVE_SUBCATEGORY: return {...state, activeSubcategory: action.payload};
        case actionTypes.SET_LOADING: return {...state, loading: false};
        default: return state;
    };
};
