import { useEffect, useReducer } from "react";
import { UserContext } from "./context";
import { reducer } from "./reducer";
import { data } from "./data";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../database/firebase';
import { actionTypes } from "./actionTypes";
import { getUserData } from "../../utils/getUserData";

export function UserProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, data);

    useEffect(() => {
        const checkAuth = onAuthStateChanged(auth, (user) => {
            user ? getUserData(user, dispatch) : dispatch({ type: actionTypes.REMOVE_DATA })
        });

        return () => checkAuth();
    }, []);

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    );
};
