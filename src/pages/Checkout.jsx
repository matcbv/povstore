import { useNavigate } from "react-router-dom";
import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";

export function Checkout(){
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <main className="min-h-screen flex flex-col gap-y-20 font-bold my-20 mx-10 lg:mx-40">
                <section>
                    <div className="w-full flex justify-between pb-20">
                        <h1 className="text-2xl md:text-3xl font-bold underline decoration-red-600 underline-offset-4">Checkout</h1>
                        <span className="flex flex-col items-center cursor-pointer font-bold" onClick={() => navigate('/bag')}>
                                <img src="/assets/images/return.png" alt="Voltar" />
                                <p>Voltar</p>
                        </span>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};
