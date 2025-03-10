import { db, storage } from "./firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export async function addProduct(productData, productImage) {
    try{
        const docRef = await addDoc(collection(db, 'products'), productData);
        const storageRef = ref(storage, docRef.id);
        await uploadBytes(storageRef, productImage);
    } catch(e){
        throw new Error(e.message);
    };
};
