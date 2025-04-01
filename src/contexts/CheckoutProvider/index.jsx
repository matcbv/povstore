import { useContext, useEffect, useReducer } from 'react';
import { CheckoutContext } from './context';
import { data } from './data';
import { reducer } from './reducer';
import { UserContext } from '../UserProvider/context';
import { updateCheckout } from '../../utils/updateCheckout';

export function CheckoutProvider({children}){
    const [userState, ] = useContext(UserContext);
    const [state, dispatch] = useReducer(reducer, data);

    useEffect(() => {
        userState.uid && updateCheckout(userState.uid, dispatch);
    }, [userState.uid]);

    return (
        <CheckoutContext.Provider value={[state, dispatch]}>
            {children}
        </CheckoutContext.Provider>
    );
};
