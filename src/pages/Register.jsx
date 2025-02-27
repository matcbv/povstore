import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";

export function Register(){
    return (
        <>
            <Header />
            <main className="h-screen">
                <section className="flex justify-evenly items-center h-full">
                    <div className="flex flex-col gap-y-12 items-start">
                        <h1 className="text-3xl font-bold tracking-wide">Crie sua conta</h1>
                        <form action="" method="POST" className="flex flex-col gap-y-8 text-black overflow-hidden">
                            <div className="flex">
                                <label htmlFor="email" className="border-b border-red-600 whitespace-nowrap">E-mail</label>
                                <input type="email" id="email" className ="border-red-600 border-b pl-6 focus:outline-none w-full" />
                            </div>
                            <div className="flex">
                                <label htmlFor="password" className="border-red-600 border-b">Senha</label>
                                <input type="password" id="password" className="border-red-600 border-b pl-6 focus:outline-none w-full" />
                            </div>
                            <div className="flex">
                                <label htmlFor="name" className="border-b border-red-600">Nome</label>
                                <input type="name" id="name" className ="border-red-600 border-b pl-6 focus:outline-none w-full" />
                            </div>
                            <div className="flex">
                                <label htmlFor="lastname" className="border-b border-red-600">Sobrenome</label>
                                <input type="lastname" id="lastname" className ="border-red-600 border-b pl-6 focus:outline-none w-full" />
                            </div>
                            <div className="flex">
                                <label htmlFor="telephone" className="border-b border-red-600">Telefone</label>
                                <input type="telephone" id="telephone" className ="border-red-600 border-b pl-6 focus:outline-none w-full" />
                            </div>
                            <div className="flex items-start gap-x-4">
                                <input type="submit" value="Cadastrar" className="border border-black py-1 rounded w-full cursor-pointer hover:font-bold" />
                                <button type="button"><img src="/assets/images/google.png" alt="Login com Google" /></button>
                            </div>
                        </form>
                    </div>
                    <div className="hidden lg:flex justify-center">
                        <img src="/assets/images/register.jpg" alt="Boas-vindas" className="w-4/5 p-4 border-r border-b border-black" />
                    </div>                 
                </section>
            </main>
            <Footer />
        </>
    );
};
