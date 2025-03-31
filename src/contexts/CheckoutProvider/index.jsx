import { useContext, useEffect, useReducer } from 'react';
import { CheckoutContext } from './context';
import { data } from './data';
import { reducer } from './reducer';
import { UserContext } from '../UserProvider/context';
import { actionTypes } from './actionTypes';
import { db } from '../../database/firebase';
import { collection, getDocs } from 'firebase/firestore';

export function CheckoutProvider({children}){
    const [userState, ] = useContext(UserContext);
    const [state, dispatch] = useReducer(reducer, data);

    useEffect(() => {
        if(userState.uid){
            const callGetDocs = async () => {
                const checkoutSnaps = await getDocs(collection(db, 'users', userState.uid, 'checkout'));
                const checkoutItems = checkoutSnaps.docs.map(snap => snap.data());
                dispatch({ type: actionTypes.ADD_DATA, payload: checkoutItems });
            };
            callGetDocs();
        };
    }, [userState.uid]);

    return (
        <CheckoutContext.Provider value={[state, dispatch]}>
            {children}
        </CheckoutContext.Provider>
    );
};
