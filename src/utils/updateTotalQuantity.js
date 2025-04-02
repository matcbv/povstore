import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";
import { actionTypes } from "../contexts/CheckoutProvider/actionTypes";

export async function updateTotalQuantity(uid, dispatch){
    const checkoutRef = collection(db, 'users', uid, 'checkout');
    const itemsSnap = await getDocs(checkoutRef);
    const totalQuantity = itemsSnap.docs.reduce((acc, item) => acc + item.data().quantity, 0);
    dispatch({ type: actionTypes.SET_TOTAL_QUANTITY, payload: totalQuantity });
};
 