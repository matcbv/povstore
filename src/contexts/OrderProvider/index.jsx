import { useReducer } from "react"
import { data } from "./data";
import { reducer } from "./reducer";
import { UserContext } from "../UserProvider/context";

export function OrderProvider({ children }){
    const [state, dispatch] = useReducer(reducer, data);

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    );
};
