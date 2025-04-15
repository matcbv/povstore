import { useNavigate } from "react-router-dom";
import { Footer } from "../layouts/Footer";
import { Header } from "../layouts/Header";

export function PaymentMethods(){
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <main className="flex min-h-screen">
                <section className="w-full flex flex-col m-20 text-black font-bold">
                    <div className="w-full flex justify-between pb-20">
                        <h1 className="text-2xl md:text-3xl">Métodos de <span className="underline decoration-red-600 underline-offset-4">pagamento</span></h1>
                        <span className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/account')}>
                                <img src="/assets/images/return.png" alt="Voltar" />
                                <p>Voltar</p>
                        </span>
                    </div>
                    <div>

                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};
