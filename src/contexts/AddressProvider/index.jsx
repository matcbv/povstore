import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useReducer } from "react";
import { AddressContext } from "./context";
import { reducer } from "./reducer";
import { data } from "./data";
import { UserContext } from "../UserProvider/context";
import { db } from "../../database/firebase";
import { actionTypes } from "./actionTypes";

export function AddressProvider({ children }){
    const [userState, ] = useContext(UserContext);
    const [state, dispatch] = useReducer(reducer, data);

    useEffect(() => {
        const callGetDocs = async () => {
            try{
                const addressesRef = collection(db, 'users', userState.uid, 'addresses');
                const q = query(addressesRef, orderBy('addedAt', 'asc'));
                const addressesSnap = await getDocs(q);
                const addresses = addressesSnap.docs.map(snap => {
                    snap.data().isDefault && dispatch({ type: actionTypes.SET_DEFAULT_ADDRESS, payload: snap.data() });
                    return {
                        ...snap.data(),
                        id: snap.id,
                    };
                });
                dispatch({ type: actionTypes.SET_ADDRESSES, payload: addresses });
            } catch(e){
                throw new Error(e.message);
            };
        };
        userState.uid && callGetDocs();
    }, [userState.uid]);

    return (
        <AddressContext.Provider value={[state, dispatch]}>
            {children}
        </AddressContext.Provider>
    );
};
