import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase";
import { UserContext } from "../contexts/UserProvider/context";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../utils/getUserData";

export function SessionForm(){
    const navigate = useNavigate();
    const [, dispatch] = useContext(UserContext);

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [userError, setUserError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            getUserData(userCredentials.user, dispatch);
            navigate('/');

        } catch(e){
            if(e.code === 'auth/invalid-email'){
                setUser('');
                setUserError('E-mail inválido');
            } else if(e.code === 'auth/invalid-credential'){
                // Podemos chamar diferentes tipos de toasts (info, success, error, warn), passando a eles a mensagem a ser exibida e um objeto opcional para personalização.
                toast.error('E-mail ou senha incorretos');
            };
        };
    };

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            setUserError('');
            setUser(e.target.value.trim());
        } else if(e.target.name === 'password'){
            setPasswordError('');
            setPassword(e.target.value.trim());
        };
    };

    return (
        <form onSubmit={ handleSubmit } className="flex flex-col w-[310px] gap-y-8 text-black">
        <div className="flex">
            <label htmlFor="email" className="border-red-600 border-b whitespace-nowrap">E-mail</label>
            <input type="email" name="email" id="email" placeholder={ userError } value={ user } className="form-inputs" onChange={ handleChange } />
        </div>
        <div className="flex">
            <label htmlFor="password" className="border-red-600 border-b">Senha</label>
            <input type="password" name="password" id="password" placeholder={ passwordError } value={ password } className="form-inputs" onChange={ handleChange } />
        </div>
        <div className="flex flex-col items-start gap-y-6">
            <div className="flex w-full gap-x-4">
                <input type="submit" value="Entrar" className="border border-black py-1 rounded w-full cursor-pointer hover:font-bold" />
                <button type="button"><img src="/assets/images/google.png" alt="Login com o Google" /></button>
            </div>
            <input type="button" value="Esqueci minha senha" className="cursor-pointer" />
        </div>
    </form>
    );
};
