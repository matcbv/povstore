import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { actionTypes } from "../contexts/UserProvider/actionTypes";
import { use } from "react";

export async function loginWithEmail(user, password){
    try{
        /*
            A função signInWithEmailAndPassword é responsável por autenticar o usuário e iniciar a sessão dele no Firebase Authentication. Ao final, caso bem-sucedido, nos será retornado um objeto contendo informações do usuário autenticado:

                user: Um objeto com os dados do usuário autenticado.
                providerId: O provedor de autenticação usado (por exemplo, "password").
                operationType: O tipo de operação realizada ("signUp" para cadastro e "signIn" para login).
            
            Caso contrário, o erro contendo a causa nos é retornado.

            Sua estrutura segue o seguinte padrão:
            
                signInWithEmailAndPassword(auth, 'user', 'password');
        */
        const userCredentials = await signInWithEmailAndPassword(auth, user, password);
        // Para obtermos os dados do usuário no Firestore, devemos obter uma referência a seu documento através de seu uid.
        const userRef = doc(db, 'users', userCredentials.user.uid);
        /*
            Com a função getDoc, conseguimos obter os dados armazenado em um docuento através de sua referência. Sua estrutura segue o seguinte padrão:

                getDoc(userRef);

            Obs.: getDoc nos retorna uma promise, portanto, devemos trabalhar por meio de funções assíncronas ou callbacks.
        */
        const userData = (await getDoc(userRef)).data();
        return {success: true, data: userData};
    } catch(e){
        return {success: false, error: e.code};
    };
};

export function checkAuth(dispatch){
    onAuthStateChanged(auth, async (user) => {
        if(user){
            try{
                dispatch({ type: actionTypes.SET_UID, payload: user.uid })
                const userRef = doc(db, 'users', user.uid);
                const userData = (await getDoc(userRef)).data();
                dispatch({ type: actionTypes.ADD_DATA, payload: userData }); 
            } catch(e){
                dispatch({type: actionTypes.SET_ERROR, payload: e.message});
                throw new Error(e.message);
            };
            dispatch({type: actionTypes.SET_LOADING, payload: false});
        } else{
            dispatch({ type: actionTypes.REMOVE_DATA });
        };
    });
};


export async function logout(dispatch) {
    try{
        await signOut(auth)
        dispatch({ type:actionTypes.REMOVE_DATA });
    } catch(e){
        dispatch({type: actionTypes.SET_ERROR, payload: e.message});
    };
};
