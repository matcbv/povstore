import { Link, useNavigate } from "react-router-dom";
import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import { useContext, useState } from "react";
import { AddressContext } from "../contexts/AddressProvider/context";
import { BagResume } from "../components/BagResume";

export function Checkout(){
    const [addressState, ] = useContext(AddressContext);
    const [shipping, setShipping] = useState(null);
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <main className="min-h-screen flex flex-col gap-y-20 font-bold my-20 mx-10 lg:mx-40">
                <section>
                    <div className="w-full flex justify-between pb-20">
                        <h1 className="text-2xl md:text-3xl underline decoration-red-600 underline-offset-4">Checkout</h1>
                        <span className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/bag')}>
                                <img src="/assets/images/return.png" alt="Voltar" />
                                <p>Voltar</p>
                        </span>
                    </div>
                    <div className="flex justify-center gap-x-20">
                        <div className="flex flex-col items-start gap-y-10">
                            <h2 className="text-xl">Endereço de entrega:</h2>
                            <div className="flex flex-col items-start gap-y-2 border-l-2 border-l-red-600 pl-3">
                                <p>CEP: {addressState.defaultAddress.cep}</p>
                                <p>{addressState.defaultAddress.street}, {addressState.defaultAddress.number} - {addressState.defaultAddress.neighborhood}</p>
                                <p>{addressState.defaultAddress.city} - {addressState.defaultAddress.state}</p>
                                <p>{addressState.defaultAddress.complement}</p>
                            </div>
                            <Link to="/account/edit" className="border-2 rounded-md px-4 py-2 text-sm border-black hover:bg-black hover:text-white transition-colors">Alterar endereço padrão</Link>
                        </div>
                        <div className="flex flex-col items-start gap-y-5">
                            <h2 className="text-xl">Forma de pagamento:</h2>
                            <p>Nenhuma forma de pagamento adicionada</p>
                            <button type="button" className="border-2 rounded-md px-4 py-2 text-sm border-black hover:bg-black hover:text-white transition-colors">Adicionar forma de pagamento</button>
                        </div>
                        <div className="flex flex-col gap-y-10">
                            <BagResume />
                            <Link to="/checkout" className="py-3 bg-black rounded-md text-white text-center hover:scale-105 transition-transform">Finalizar compra</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};
