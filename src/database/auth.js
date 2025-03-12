import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

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
        return {success: true, data: userData}
    } catch(e){
        return {success: false, error: e.code};
    };
};

export async function logout() {
    await signOut(auth);
};
