import { useState } from "react";
import { auth, db, provider } from "../database/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function RegisterForm(){
    const navigate = useNavigate();
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
                
                O email já está cadastrado?
                    SIM → Retorna erro (auth/email-already-in-use).
                    NÃO → Continua com a criação da conta.

                O email tem um formato válido?
                    SIM → Continua com a criação.
                    NÃO → Retorna erro (auth/invalid-email).

                A senha atende os requisitos mínimos? (Ao mínimo 6 caracteres)
                    SIM → Continua.
                    NÃO → Retorna erro (auth/weak-password).

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

                docRef é a referência ao documento onde os dados serão armazenados. Podemos criar tal referência com a função doc.
            */
            if(userCredential.user){
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    name: userData.name,
                    lastname: userData.lastname,
                    phoneNumber: userData.phoneNumber,
                    address: null,
                    createdAt: new Date().toLocaleDateString('pt-BR'),
                });
                navigate('/session');
                toast.success('Conta criada com sucesso');
            };
        } catch(e){
            switch(e.code){
                case('auth/email-already-in-use'): {
                    toast.error('E-mail já cadastrado.');
                    break;
                };
                case('auth/invalid-email'): {
                    toast.error('E-mail inválido');
                    break;
                };
                case('auth/weak-password'): {
                    toast.error('A senha deve conter, ao menos, 6 caracteres');
                    break;
                };
                default: {
                    toast.error('Um erro desconhecido ocorreu. Tente novamente.')
                    throw new Error(e.code);
                };
            };
        };
    };

    const submitWithGoogle = () => signInWithPopup(auth, provider);

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
            <div className="flex">
                <label htmlFor="email" className="border-b border-red-600 whitespace-nowrap w-">E-mail</label>
                <input type="email" id="email" name="email" autoComplete="email" value={ userData.email } className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex">
                <label htmlFor="password" className="border-b border-red-600">Senha</label>
                <input type="password" id="password" name="password" autoComplete="new-password" value={ userData.password } className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex">
                <label htmlFor="name" className="border-b border-red-600">Nome</label>
                <input type="name" id="name" name="name" autoComplete="given-name" value={ userData.name } className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex">
                <label htmlFor="lastname" className="border-b border-red-600">Sobrenome</label>
                <input type="lastname" id="lastname" name="lastname" autoComplete="family-name" value={ userData.lastname } className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex">
                <label htmlFor="phoneNumber" className="border-b border-red-600">Telefone</label>
                <input type="phoneNumber" id="phoneNumber" name="phoneNumber" autoComplete="tel" value={ userData.phoneNumber } className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex items-center gap-x-4">
                <input type="submit" value="Cadastrar" className="border border-black py-1 rounded w-full cursor-pointer hover:font-bold" />
                <button type="button"><img src="/assets/images/google.png" alt="Criar conta com o Google" onClick={ submitWithGoogle } /></button>
            </div>
        </form>
    );
};
