import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import { BagList } from "../components/BagList";
import { useNavigate } from "react-router-dom";

export function Bag(){
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <main className="min-h-screen flex flex-col gap-y-20 font-bold my-20 mx-10 lg:mx-40">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl lg:text-3xl underline decoration-red-600 underline-offset-4">Sacola de compras</h1>
                    <span className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/catalog')}>
                        <img src="/assets/images/return.png" alt="Voltar" className="w-6 lg:w-8" />
                        <p className="text-sm lg:text-base">Voltar</p>
                    </span>
                </div>
                <BagList />
            </main>
            <Footer />
        </>
    );
};
