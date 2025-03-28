import { doc, getDoc } from "firebase/firestore";
import { db } from "../database/firebase";

export async function getProduct(id){
    try{
        const productRef = doc(db, 'products', id);
        const product = await getDoc(productRef);
        return product;
    } catch(e){
        throw new Error(e.message);
    };
};
