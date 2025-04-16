import { useReducer } from 'react';
import { PaymentContext } from './context';
import { data } from './data';
import { reducer } from './reducer';

export function PaymentProvider({ children }){
    const [state, dispatch] = useReducer(reducer ,data);

    return (
        <PaymentContext.Provider value={[state, dispatch]}>
            { children }
        </PaymentContext.Provider>
    );
};
