import { useState } from "react";

import { auth } from "../database/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function RegisterForm(){
    const [dataObject, setDataObject] = useState({
        email: '',
        password: '',
        name: '',
        lastname: '',
        telephone: '',
    });
    const [errorObject, setErrorObject] = useState({
        emailError: '',
        passwordError: '',
    })

    const handleChange = (e) => {
        setDataObject({
            ...dataObject,
            [e.target.name]: e.target.name,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(dataObject.password.length >= 8){
            try{
                const userCredential = await createUserWithEmailAndPassword(auth, dataObject.email, dataObject.password);
                console.log(userCredential);
            } catch(e){
                console.log(`${e.name}: ${e.message}`)
            };
        } else{
            setErrorObject({...errorObject, passwordError: 'Sua senha deve ter no mínimo 8 caracteres'})
        }
    };

    return (
        <form onSubmit={ handleSubmit } className="flex flex-col w-[310px] gap-y-8 text-black overflow-hidden">
            <div className="flex">
                <label htmlFor="email" className="border-b border-red-600 whitespace-nowrap">E-mail</label>
                <input type="email" id="email" name="email" autoComplete="email" className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex">
                <label htmlFor="password" className="border-red-600 border-b">Senha</label>
                <input type="password" id="password" name="password" autoComplete="new-password" className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex">
                <label htmlFor="name" className="border-b border-red-600">Nome</label>
                <input type="name" id="name" name="name" autoComplete="given-name" className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex">
                <label htmlFor="lastname" className="border-b border-red-600">Sobrenome</label>
                <input type="lastname" id="lastname" name="lastname" autoComplete="family-name" className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex">
                <label htmlFor="telephone" className="border-b border-red-600">Telefone</label>
                <input type="telephone" id="telephone" name="telephone" autoComplete="tel" className="form-inputs" onChange={ handleChange } />
            </div>
            <div className="flex items-center gap-x-4">
                <input type="submit" value="Cadastrar" className="border border-black py-1 rounded w-full cursor-pointer hover:font-bold" />
                <button type="button"><img src="/assets/images/google.png" alt="Criar coonta com o Google" /></button>
            </div>
        </form>
    );
};
