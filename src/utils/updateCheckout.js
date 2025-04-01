import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";
import { actionTypes } from "../contexts/CheckoutProvider/actionTypes";

export async function updateCheckout(uid, dispatch){
    try{
        const checkoutSnaps = await getDocs(collection(db, 'users', uid, 'checkout'));
        const checkoutItems = checkoutSnaps.docs.map(snap => snap.data());
        dispatch({ type: actionTypes.ADD_ITEMS, payload: checkoutItems });
    } catch(e){
        throw new Error(e.message);
    };
};
