import { db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getProducts(gender, category, subcategory){
    try{
        let q = query(collection(db, 'products'), where('gender', 'in', [gender, 'unisex']));
        if(category){
            q = query(q, where('category', '==', category));
        };
        if(subcategory){
            q = query(q, where('subcategory', '==', subcategory));
        };
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
