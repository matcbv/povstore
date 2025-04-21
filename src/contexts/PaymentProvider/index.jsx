import { useContext, useEffect, useReducer } from 'react';
import { PaymentContext } from './context';
import { data } from './data';
import { reducer } from './reducer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebase';
import { UserContext } from '../UserProvider/context';
import { actionTypes } from './actionTypes';

export function PaymentProvider({ children }){
    const [state, dispatch] = useReducer(reducer ,data);
    const [userState, ] = useContext(UserContext);

    useEffect(() => {
        const callGetDocs = async () => {
            if(userState.uid){
                try{
                    const paymentMethodsRef = collection(db, 'users', userState.uid, 'paymentMethods');
                    const paymentMethodsSnap = await getDocs(paymentMethodsRef);
                    const paymentMethods = paymentMethodsSnap.docs.map( snap => ({
                        ...snap.data(),
                        id: snap.id,
                    }));
                    dispatch({ type: actionTypes.SET_PAYMENT_METHODS, payload: paymentMethods});
                    dispatch({ type: actionTypes.SET_LOADING, payload: false });
                } catch(e) {
                    throw new Error(e.message);
                };
            };
        };
        callGetDocs();
    }, [userState.uid]);

    return (
        <PaymentContext.Provider value={[state, dispatch]}>
            { children }
        </PaymentContext.Provider>
    );
};
