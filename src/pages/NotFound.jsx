import { Link } from "react-router-dom";
import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";

export function NotFound(){
    return (
        <>
            <Header />
            <main className="flex items-center justify-start h-screen bg-[linear-gradient(to_right,_white,_#0000004a)]">
                <div className="flex flex-col items-start gap-y-10 m-20">
                    <h1 className="text-5xl font-bold">Página não encontrada<span className="text-red-600">.</span></h1>
                    <Link to='/' className="border-2 border-black px-6 py-3 rounded cursor-pointer font-bold transition hover:bg-black hover:text-white">Voltar a página inicial</Link>
                </div>
            </main>
            <Footer />
        </>
    );
};
