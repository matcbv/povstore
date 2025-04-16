import { actionTypes } from "./actionTypes";

export function reducer(state, action){
    switch(action.type){
        case actionTypes.SET_PAYMENT_METHODS: return { paymentMethods: [...action.payload] };
        case actionTypes.ADD_PAYMENT_METHOD: return { paymentMethods: [...state, ...action.payload] };
    };
};
