import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export async function addFavorite(uid, productID){
    console.log(uid, productID);
    const docRef = doc(db, 'products', uid, 'favorites', productID);
    await setDoc(docRef, {
        addedAt: new Date().toLocaleString('pt-BR'),
    });
};
