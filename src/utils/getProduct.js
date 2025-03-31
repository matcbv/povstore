import { doc, getDoc } from "firebase/firestore";
import { db } from "../database/firebase";

export async function getProduct(id){
    try{
        /*
            Obtendo a referência ao nosso documento com o método doc:

            Devemos passar três parâmetros:
            1 - Referência ao nosso banco de dados;
            2 - Caminho base do nosso documento;
            3 - Segmentos do nosso documento;
        */
        const productRef = doc(db, 'products', id);
        // Obtendo o nosso docunento através da referência obtida:
        const productSnap = await getDoc(productRef);
        // Retornado os dados do documento obtido através do método data:
        return productSnap.data();
    } catch(e){
        throw new Error(e.message);
    };
};
