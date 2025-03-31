import { addDoc, collection } from "firebase/firestore";
import { db } from "../database/firebase";

export async function addItemToBag(uid, itemData){
    try{
        const itemRef = collection(db, 'users', uid, 'checkout');
        await addDoc(itemRef, itemData);
        return {success: true, error: null};
    } catch(e){
        return {success: false, error: e.message};
    };
};