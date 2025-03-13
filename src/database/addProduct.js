import { db, storage } from "./firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function addProduct(productData, productImage) {
    try{
        // Obtendo a referência do documento do produto
        const docRef = await addDoc(collection(db, 'products'), productData);
        // Obtendo a referência da imagem a ser vinculada ao produto
        const storageRef = ref(storage, `products/${docRef.id}`);
        // Salvando a imagem em nosso diretório do Firebase Storage
        await uploadBytes(storageRef, productImage);
        // Obtendo a URL da imagem
        const imageURL = await getDownloadURL(storageRef);
        // Atualizando o documento do produto com a URL da imagem obtido
        updateDoc(docRef, {imageURL});
    } catch(e){
        throw new Error(e.message);
    };
};
