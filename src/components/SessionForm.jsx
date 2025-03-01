import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase";

export function SessionForm(){
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const userCredentials = await signInWithEmailAndPassword(auth, user, password);
            console.log(userCredentials);
        } catch(e){
            console.log(`${e.name}: ${e.message}`);
        };
    };

    return (
        <form onSubmit={ handleSubmit } className="flex flex-col w-[310px] gap-y-8 text-black">
        <div className="flex">
            <label htmlFor="email" className="border-red-600 border-b whitespace-nowrap">E-mail</label>
            <input type="email" id="email" className="form-inputs" onChange={value => setUser(value)} />
        </div>
        <div className="flex">
            <label htmlFor="password" className="border-red-600 border-b">Senha</label>
            <input type="password" id="password" className="form-inputs" onChange={value => setPassword(value)} />
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
