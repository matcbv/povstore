import { useReducer } from 'react';
import { CartContext } from './context';
import { data } from './data';
import { reducer } from './reducer';

export function CartProvider({children}){
    const [state, dispatch] = useReducer(reducer, data);

    return (
        <CartContext.Provider value={[state, dispatch]}>
            {children}
        </CartContext.Provider>
    );
};
