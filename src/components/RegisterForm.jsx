import { useState } from "react";

import { auth, db, provider } from "../database/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function RegisterForm(){
    const navigate = useNavigate();

    const [dataObject, setDataObject] = useState({
        email: '',
        password: '',
        name: '',
        lastname: '',
        phoneNumber: '',
    });
    const [errorObject, setErrorObject] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        for(let k of Object.keys(errorObject)){
            if(k === e.target.name){
                errorObject[k] = '';
            };
        }
        setDataObject({
            ...dataObject,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(dataObject.password.length >= 8){
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

                    Ao final, caso bem-sucedido, nos será retornado um objeto contendo:

                        user: Um objeto com os dados do usuário autenticado.
                        providerId: O provedor de autenticação usado (por exemplo, "password").
                        operationType: O tipo de operação realizada ("signIn" para login).
                    
                    Caso contrário, o erro contendo a causa nos é retornado.
                */
                const userCredential = await createUserWithEmailAndPassword(auth, dataObject.email, dataObject.password);
                /*
                    A função setDoc nos permite criar um documento definindo manualmente seu ID. Caso um com o mesmo ID já exista, será substituído pelo novo. Sua estrutura segue o seguinte padrão:

                        setDoc(docRef, { key: value });

                    docRef é a referência ao documento onde os dados serão armazenados. Podemos criar tal referência com a função doc.
                */
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    name: dataObject.name,
                    lastname: dataObject.lastname,
                    phoneNumber: dataObject.phoneNumber,
                    createdAt: new Date().toLocaleDateString('pt-BR'),
                });

                if(userCredential.user){
                    navigate('/session');
                    toast.success('Conta criada com sucesso');
                };
            } catch(e){
                if(e.code === 'auth/email-already-in-use'){
                    setDataObject({...dataObject, email: ''});
                    setErrorObject({...errorObject, email: 'E-mail já está em uso'});
                } else if(e.code === 'auth/invalid-email'){
                    setDataObject({...dataObject, email: ''});
                    setErrorObject({...errorObject, email: 'E-mail inválido'});
                };
            };
        } else{
            setDataObject({...dataObject, password: ''});
            setErrorObject({...errorObject, password: 'Senha menor que 8 caracteres'});
        };
    };

    const submitWithGoogle = () => {
        signInWithPopup(auth, provider);
    };

    return (
        <form onSubmit={ handleSubmit } className="flex flex-col w-[310px] gap-y-8 text-black overflow-hidden">
            <div className="flex">
                <label htmlFor="email" className="border-b border-red-600 whitespace-nowrap">E-mail</label>
                <input type="email" id="email" name="email" autoComplete="email" placeholder={ errorObject.email } value={ dataObject.email } className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex">
                <label htmlFor="password" className="border-red-600 border-b">Senha</label>
                <input type="password" id="password" name="password" autoComplete="new-password" placeholder={ errorObject.password } value={ dataObject.password } className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex">
                <label htmlFor="name" className="border-b border-red-600">Nome</label>
                <input type="name" id="name" name="name" autoComplete="given-name" value={ dataObject.name } className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex">
                <label htmlFor="lastname" className="border-b border-red-600">Sobrenome</label>
                <input type="lastname" id="lastname" name="lastname" autoComplete="family-name" value={ dataObject.lastname } className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex">
                <label htmlFor="phoneNumber" className="border-b border-red-600">Telefone</label>
                <input type="phoneNumber" id="phoneNumber" name="phoneNumber" autoComplete="tel" value={ dataObject.phoneNumber } className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex items-center gap-x-4">
                <input type="submit" value="Cadastrar" className="border border-black py-1 rounded w-full cursor-pointer hover:font-bold" />
                <button type="button"><img src="/assets/images/google.png" alt="Criar coonta com o Google" onClick={ submitWithGoogle } /></button>
            </div>
        </form>
    );
};
