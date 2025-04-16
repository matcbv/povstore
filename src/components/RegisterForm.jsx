import { useContext, useState } from "react";
import { auth, db } from "../database/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../database/auth";
import { actionTypes } from "../contexts/UserProvider/actionTypes";
import { UserContext } from "../contexts/UserProvider/context";

export function RegisterForm(){
    const labelMap = {
        email: 'E-mail',
        password: 'Senha',
        name: 'Nome',
        lastname: 'Sobrenome',
        phoneNumber: 'Telefone', 
    };
    const navigate = useNavigate();
    const [, dispatch] = useContext(UserContext);
    const [userData, setuserData] = useState({
        email: '',
        password: '',
        name: '',
        lastname: '',
        phoneNumber: '',
    });

    const handleChange = (e) => setuserData({...userData, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!checkData()){
            toast.error('Preencha todos os campos para concluir o cadastro.');
            return;
        };
        try{
            /*
                Com a função createUserWithEmailAndPassword, é realizado o cadastro de um novo usuário, desde que seus dados atendam os seguintes pré-requisitos:
                
                - O email já está cadastrado ? Retorna erro (auth/email-already-in-use) : Continua com a criação da conta
                - O email tem um formato válido ? Continua com a criação : Retorna erro (auth/invalid-email)
                - A senha atende os requisitos mínimos (Ao mínimo 6 caracteres) ? Continua : Retorna erro (auth/weak-password)

                Ao final, caso bem-sucedido, nos será retornado um objeto contendo informações do usuário autenticado:

                    user: Um objeto com os dados do usuário autenticado.
                    providerId: O provedor de autenticação usado (por exemplo, "password").
                    operationType: O tipo de operação realizada ("signUp" para cadastro e "signIn" para login).
                
                Caso contrário, o erro contendo a causa nos é retornado.
            */
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            /*
                A função setDoc nos permite criar um documento definindo manualmente seu ID. Caso um com o mesmo ID já exista, será substituído pelo novo. Sua estrutura segue o seguinte padrão:

                    setDoc(docRef, { key: value });

                Obs.: docRef é a referência ao documento onde os dados serão armazenados. Podemos criar tal referência com a função doc.
            */
            if(userCredential.user){
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    name: userData.name,
                    lastname: userData.lastname,
                    phoneNumber: userData.phoneNumber,
                    createdAt: new Date().toLocaleString('pt-BR'),
                });
                navigate('/session');
                toast.success('Conta criada com sucesso.');
            };
        } catch(e){
            switch(e.code){
                case('auth/email-already-in-use'): {
                    toast.error('E-mail já cadastrado.');
                    break;
                };
                case('auth/invalid-email'): {
                    toast.error('E-mail inválido.');
                    break;
                };
                case('auth/weak-password'): {
                    toast.error('A senha deve conter, ao menos, 6 caracteres.');
                    break;
                };
                default: {
                    toast.error('Um erro desconhecido ocorreu. Tente novamente.');
                    throw new Error(e.code);
                };
            };
        };
    };

    const submitWithGoogle = async () => {
        const response = await loginWithGoogle();
        if(response.success){
            dispatch({ type: actionTypes.ADD_DATA, payload: response.data });
            navigate('/');
            toast.success('Conta criada com sucesso.');
        } else{
            if(response.error === 'auth/popup-blocked'){
                toast.error('Popup para login bloqueado pelo navegador.');
            } else if(response.error === 'auth/credential-already-in-use'){
                toast.error('E-mail já vinculado à outra conta.');
            } else{
                toast.error('Um erro desconhecido ocorreu. Tente novamente.');
            };
        };
    };

    const checkData = () => {
        for(const value of Object.values(userData)){
            if(!value){
                return false;
            };
        };
        return true;
    };

    return (
        <form onSubmit={ handleSubmit } className="flex flex-col w-[310px] gap-y-8 text-black overflow-hidden">
            {Object.keys(userData).map(key => (
                <div key={key} className="flex">
                    <label htmlFor={key} className="border-b border-red-600 whitespace-nowrap w-">{ labelMap[key] }</label>
                    <input type={key === 'password' ? 'password' : 'text'} name={key} value={ userData[key] } className="account-inputs" onChange={ handleChange } />
                </div>
            ))}
            <div className="flex items-center gap-x-4">
                <input type="submit" value="Cadastrar" className="border border-black py-1 rounded w-full cursor-pointer hover:font-bold" />
                <img
                    src="/assets/images/google.png"
                    alt="Criar conta com o Google"
                    className="cursor-pointer"
                    onClick={ submitWithGoogle }
                />    
            </div>
        </form>
    );
};
