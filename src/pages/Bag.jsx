import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import { BagList } from "../components/BagList";
import { Link, useNavigate } from "react-router-dom";
import { BagResume } from "../components/BagResume";

export function Bag(){
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <main className="min-h-screen flex flex-col gap-y-20 my-20 mx-10 lg:mx-40">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl lg:text-3xl underline decoration-red-600 underline-offset-4">Sacola de compras</h1>
                    <span className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/catalog')}>
                        <img src="/assets/images/return.png" alt="Voltar" className="w-6 lg:w-8" />
                        <p className="text-sm lg:text-base">Voltar</p>
                    </span>
                </div>
                <section className="flex justify-around items-start">
                    <BagList />
                    <div className="flex flex-col gap-y-10">
                        <BagResume />
                        <Link to="/checkout" className="py-3 bg-black rounded-md text-white text-center font-bold hover:scale-105 transition-transform">Continuar compra</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};
