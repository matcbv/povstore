import { useContext, useEffect, useReducer } from "react"
import { data } from "./data";
import { reducer } from "./reducer";
import { UserContext } from "../UserProvider/context";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../database/firebase";
import { actionTypes } from "./actionTypes";
import { OrderContext } from "./context";

export function OrderProvider({ children }){
    const [userState, ] = useContext(UserContext);
    const [state, dispatch] = useReducer(reducer, data);

    useEffect(() => {
        const callGetDocs = async () => {
            try{
                const ordersRef = collection(db, 'users', userState.uid, 'orders');
                const q = query(ordersRef, orderBy('orderData', 'desc'));
                const ordersSnap = await getDocs(q);
                const orders = ordersSnap.docs.map(order => ({
                    ...order.data(),
                    id: order.id
                }));
                dispatch({ type: actionTypes.SET_ORDERS, payload: orders });
            } catch(e){
                throw new Error(e.message);
            };
        };
        userState.uid && callGetDocs();
    }, [userState.uid]);

    return (
        <OrderContext.Provider value={[state, dispatch]}>
            {children}
        </OrderContext.Provider>
    );
};
