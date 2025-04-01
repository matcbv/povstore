import { db } from "../database/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function getProducts(gender, category, subcategory){
    try{
        let q = query(collection(db, 'products'));
        if(gender){
            q = query(q,  where('gender', 'in', [gender, 'unisex']));
        };
        if(category){
            q = query(q, where('category', '==', category));
        };
        if(subcategory){
            q = query(q, where('subcategory', '==', subcategory));
        };
        /*
            Obtendo todos os documentos de uma coleção com o método getDocs:

            Devemos passar como parâmetro uma referência à coleção.
        */
        const productsSnap = await getDocs(q);
        // Iremos retornar um array contendo objetos com os dados e o id de cada produto:
        const products = productsSnap.docs.map((doc) => (
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
