import { useEffect, useReducer } from "react";
import { UserContext } from "./context";
import { reducer } from "./reducer";
import { data } from "./data";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../../database/firebase';
import { actionTypes } from "./actionTypes";
import { doc, getDoc } from "firebase/firestore";

export function UserProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, data);

    useEffect(() => {
        const checkAuth = onAuthStateChanged(auth, async (user) => {
            if(user){
                try{
                    const userRef = doc(db, 'users', user.uid);
                    const userData = (await getDoc(userRef)).data();
                    dispatch({ type: actionTypes.ADD_DATA, payload: userData });
                } catch(e){
                    throw new Error(e.message);
                };
            } else{
                dispatch({ type: actionTypes.REMOVE_DATA })
            };
        });
        return () => checkAuth();
    }, []);

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    );
};
