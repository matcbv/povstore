import { collection, getDocs } from "firebase/firestore";
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
            if(userState.uid){
                try{
                    const addressesRef = collection(db, 'users', userState.uid, 'addresses');
                    const addressesSnap = await getDocs(addressesRef);
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
        };
        callGetDocs();
    }, [userState.uid]);

    return (
        <AddressContext.Provider value={[state, dispatch]}>
            {children}
        </AddressContext.Provider>
    );
};
