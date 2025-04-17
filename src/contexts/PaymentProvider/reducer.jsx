import { actionTypes } from "./actionTypes";

export function reducer(state, action){
    switch(action.type){
        case actionTypes.SET_PAYMENT_METHODS: return {...state, paymentMethods: action.payload };
        case actionTypes.ADD_PAYMENT_METHOD: return {...state, paymentMethods: [...state.paymentMethods, action.payload] };
        case actionTypes.UPDATE_PAYMENT_METHOD: {
            const updatedPaymentMethods = state.paymentMethods.map(paymentMethod => paymentMethod.id !== action.payload.id ? paymentMethod : action.payload);
            return {...state, paymentMethods: updatedPaymentMethods };
        };
        case actionTypes.DELETE_PAYMENT_METHOD: {
            const filteredPaymentMethods = state.paymentMethods.filter(paymentMethod => paymentMethod.id !== action.payload.id);
            return {...state, paymentMethods: filteredPaymentMethods };
        };
        case actionTypes.SET_LOADING: return {...state, loading: action.payload};
        default: return state;
    };
};
