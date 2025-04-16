import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserProvider/context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle } from "../database/auth";
import { actionTypes } from "../contexts/UserProvider/actionTypes";

export function SessionForm(){
    const navigate = useNavigate();
    const [, dispatch] = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        /*
            Iniciando uma sessão com o método loginWithEmail:

            Devemos passar o email e senha como parâmetro.
        */
        const response = await loginWithEmail(email, password);
        if(response.success){
            // Adicionado as dados do usuário logado ao ao estado do usuário:
            dispatch({ type: actionTypes.ADD_DATA, payload: response.data });
            navigate('/');
            toast.success('Usuário logado com sucesso.');
        } else{
            if(response.error === 'auth/invalid-email'){
                setEmail('');
                toast.error('E-mail inválido');
            } else if(response.error === 'auth/invalid-credential'){
                // Podemos chamar diferentes tipos de toasts (info, success, error, warn), passando a eles a mensagem a ser exibida e um objeto opcional para personalização.
                toast.error('E-mail ou senha incorretos');
            };
        };
    };

    const handleGoogle = async () => {
        const response = await loginWithGoogle();
        if(response.success){
            dispatch({ type: actionTypes.ADD_DATA, payload: response.data });
            navigate('/');
            toast.success('Usuário logado com sucesso.');
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

    return (
        <form onSubmit={ handleSubmit } className="flex flex-col w-[310px] gap-y-8 text-black">
        <div className="flex">
            <label htmlFor="email" className="border-red-600 border-b whitespace-nowrap">E-mail</label>
            <input type="email" name="email" value={ email } className="account-inputs" onChange={ (e) => setEmail(e.target.value.trim()) } />
        </div>
        <div className="flex">
            <label htmlFor="password" className="border-red-600 border-b">Senha</label>
            <input type="password" name="password" value={ password } className="account-inputs" onChange={ (e) => setPassword(e.target.value.trim()) } />
        </div>
        <div className="flex flex-col items-start gap-y-6">
            <div className="flex w-full gap-x-4">
                <input type="submit" value="Entrar" className="border border-black py-1 rounded w-full cursor-pointer hover:font-bold" />
                <img
                    src="/assets/images/google.png"
                    alt="Login com o Google"
                    className="cursor-pointer"
                    onClick={ handleGoogle }
                />
            </div>
            <input type="button" value="Esqueci minha senha" className="cursor-pointer underline-offset-4 hover:underline" />
        </div>
    </form>
    );
};
