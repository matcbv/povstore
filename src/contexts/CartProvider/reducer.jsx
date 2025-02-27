import { action_types } from "./action_types";

export function reducer(state, action){
    switch(action.type){
        case action_types.INCREMENT: return {...state, index: state.index + 1};
        case action_types.DECREMENT: {
            if(state.index <= 0){
                return state;
            };
            return {...state, index: state.index - 1};
        };
        default: return state;
    };
};
