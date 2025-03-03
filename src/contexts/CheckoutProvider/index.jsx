import { useReducer } from 'react';
import { CheckoutContext } from './context';
import { data } from './data';
import { reducer } from './reducer';

export function CheckoutProvider({children}){
    const [state, dispatch] = useReducer(reducer, data);

    return (
        <CheckoutContext.Provider value={[state, dispatch]}>
            {children}
        </CheckoutContext.Provider>
    );
};
