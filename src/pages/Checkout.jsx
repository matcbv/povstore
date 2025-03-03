import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CheckoutContext } from "../contexts/CheckoutProvider/context"; 

export function Checkout(){
    const [state] = useContext(CheckoutContext);

    return (
        <>
            <Header />
            <main className="flex justify-evenly items-center h-screen">
                <div className="flex flex-col items-start gap-y-14">
                    <h1 className="text-3xl font-bold">Sacola de compras</h1>
                    <div className="flex flex-col items-start gap-y-4">
                        <p className="font-bold">Ops... Ainda não há nenhum item aqui.</p>
                        <Link to='/' className="bg-black text-white p-3 font-bold rounded">Continuar comprando</Link>
                    </div>
                </div>
                <div className="py-8 px-12 rounded border-2 border-black">
                    <h2 className="text-xl mb-8 font-bold">Resumo da compra</h2>
                    <div className="flex flex-col gap-y-8">
                        <ul className="flex flex-col gap-y-2">
                            <li>Número de itens: <span className="text-red-600">{ state.index }</span></li>
                            <li>Valor total: <span className="text-red-600">R$ { state.price.toFixed(2) }</span></li>
                            <li>Descontos:</li>
                        </ul>
                        <div>
                            <p className="font-bold">Valor final: <span className="text-red-600">R$ 00.00</span></p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};
