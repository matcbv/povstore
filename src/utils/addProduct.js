import { db, storage } from "../database/firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function addProduct(productData, productImage) {
    try{
        /*
            Obtendo a referência do documento do produto:

            Devemos passar a referência à coleção com o método collection, junto do objeto contendo os dados do novo documento.
        */
        const docRef = await addDoc(collection(db, 'products'), productData);
        /*
            Obtendo a referência da imagem a ser vinculada ao produto:
            
            Com o Firebase Storage, obtemos a referência de nosso documento através do método ref.
        */
        const storageRef = ref(storage, `products/${docRef.id}`);
        // Salvando a imagem em nosso diretório do Firebase Storage
        await uploadBytes(storageRef, productImage);
        // Obtendo a URL da imagem
        const imageURL = await getDownloadURL(storageRef);
        // Atualizando o documento do produto com a URL da imagem obtido
        await updateDoc(docRef, {imageURL});
        return {success: true}
    } catch(e){
        return {success: false, error: e.code};
    };
};
