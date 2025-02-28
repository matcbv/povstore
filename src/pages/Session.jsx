import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import { Login } from "../components/Login";

import { Link } from "react-router-dom";

export function Session(){
    return (
        <>
            <Header />
            <main className="h-screen bg-[linear-gradient(#0000004a,_white_30%)]">
                <section className="flex justify-center md:justify-evenly items-center h-full">
                    <div className="flex flex-col gap-y-12 items-start">
                        <h1 className="text-3xl font-bold tracking-wide">Faça login</h1>
                        <form action="" method="POST" className="flex flex-col w-[310px] gap-y-8 text-black">
                            <div className="flex">
                                <label htmlFor="email" className="border-red-600 border-b whitespace-nowrap">E-mail</label>
                                <input type="email" id="email" className="form-inputs" />
                            </div>
                            <div className="flex">
                                <label htmlFor="password" className="border-red-600 border-b">Senha</label>
                                <input type="password" id="password" className="form-inputs" />
                            </div>
                            <Login />
                        </form>
                        <div className="flex flex-col gap-y-2 w-full">
                            <h2 className="font-bold">Ainda não possui conta?</h2>
                            <Link to="/register" className="border border-black text-center rounded w-full py-1 hover:font-bold">Criar conta</Link>
                        </div>
                    </div>
                    <div className="w-fit hidden lg:flex justify-center">
                        <img src="/assets/images/welcome.webp" alt="Boas-vindas" className="w-4/5 p-4 border-r border-b border-black" />
                    </div>                 
                </section>
            </main>
            <Footer />
        </>
    );
};
