import { db } from "../database/firebase";
import { actionTypes } from "../contexts/UserProvider/actionTypes";
import { doc, getDoc } from "firebase/firestore";

export async function getUserData(user, dispatch){
    try{
        // Para obtermos os dados do usuário no Firestore, devemos obter uma referência a seu documento através de seu uid.
        const userRef = doc(db, 'users', user.uid);
        /*
            Com a função getDoc, conseguimos obter os dados armazenado em um docuento através de sua referência. Sua estrutura segue o seguinte padrão:

                getDoc(userRef);

            Obs.: getDoc nos retorna uma promise, portanto, devemos trabalhar por meio de funções assíncronas ou callbacks.
        */
        const userData = (await getDoc(userRef)).data();
        dispatch({ type: actionTypes.ADD_DATA, payload: userData });
    } catch(e){
        throw new Error(e.message);
    };
};
