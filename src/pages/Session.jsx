import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import { Link } from "react-router-dom";

export function Session(){
    return (
        <>
            <Header />
            <main className="h-screen">
                <section className="flex justify-center md:justify-evenly items-center h-full">
                    <div className="flex flex-col gap-y-12 items-start">
                        <h1 className="text-3xl font-bold tracking-wide">Faça login</h1>
                        <form action="" method="POST" className="flex flex-col gap-y-8 text-black w-full">
                            <div className="flex">
                                <label htmlFor="email" className="border-b border-red-600">E-mail</label>
                                <input type="email" id="email" className="border-red-600 border-b pl-6 focus:outline-none" />
                            </div>
                            <div className="flex">
                                <label htmlFor="password" className="border-red-600 border-b">Senha</label>
                                <input type="password" id="password" className="border-red-600 border-b pl-6 focus:outline-none" />
                            </div>
                            <div className="flex flex-col items-start gap-y-6">
                                <span className="flex w-full gap-x-4">
                                    <input type="submit" value="Entrar" className="border border-black py-1 rounded w-full cursor-pointer hover:font-bold" />
                                    <button type="button"><img src="/assets/images/google.png" alt="Login com Google" /></button>
                                </span>
                                <input type="button" value="Esqueci minha senha" className="cursor-pointer" />
                            </div>
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
