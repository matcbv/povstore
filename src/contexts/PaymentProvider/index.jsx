import { useContext, useReducer } from 'react';
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

    useContext(() => {
        const callGetDocs = async () => {
            if(userState.uid){
                try{
                    const paymentMethodsRef = collection(db, 'users', userState.uid, 'paymentMethods');
                    const paymentMethodsSnap = await getDocs(paymentMethodsRef);
                    console.log(paymentMethodsSnap.docs);
                    dispatch({ type: actionTypes.SET_PAYMENT_METHODS, payload: paymentMethodsSnap.docs.map( paymentMethod => ({
                        ...paymentMethod.data,
                        id: paymentMethod.id,
                    }))});
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
