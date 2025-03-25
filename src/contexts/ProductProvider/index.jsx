import { useReducer } from "react";
import { ProductContext } from "./context";
import { data } from "./data";
import { reducer } from "./reducer";

export function ProductProvider({children}){
    const [state, dispatch] = useReducer(reducer, data);

    return(
        <ProductContext.Provider value={[state, dispatch]}>
            {children}
        </ProductContext.Provider>
    );
};
