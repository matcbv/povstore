import { actionTypes } from "./actionTypes";

export const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.SET_ORDERS : return {...state, orders: action.payload};
        case actionTypes.ADD_ORDER : return {...state, orders: [...state.orders, action.payload]};
        case actionTypes.UPDATE_ORDER: {
            const updatedOrders = state.orders.map(order => order.id === action.payload.id ? action.payload : order);
            return {...state, orders: updatedOrders};
        };
        default: return state;
    };
};
