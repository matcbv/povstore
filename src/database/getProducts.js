import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getProducts(gender){
    try{
        const q = query(collection(db, 'products'), where('gender', 'in', [gender, 'unisex']));
        const productsRef = await getDocs(q);
        const products = productsRef.docs.map((doc) => (
            {
                id: doc.id,
                ...doc.data(),
            }
        ));
        return products;
    } catch(e){
        throw new Error(e);
    };
};
