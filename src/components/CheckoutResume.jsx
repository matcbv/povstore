import { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "../contexts/CheckoutProvider/context";

export function CheckoutResume(){
    const [state, ] = useContext(CheckoutContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        const newTotalPrice = state.items.reduce((acc, item) => acc + parseFloat(item.price.replace(',', '.')), 0);
        setTotalPrice(newTotalPrice);
    }, [state.items]);

    return (
        <div className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-10 w-[350px] px-5 py-10 rounded border-2 border-black shadow-lg">
                <h2 className="text-xl">Resumo da compra</h2>
                <div className="flex flex-col gap-y-10">
                    <ul className="flex flex-col gap-y-5">
                        <li>Número de itens: <span className="">{state.totalQuantity}</span></li>
                        <li>Valor total: <span className="">R$ {totalPrice.toFixed(2).replace('.', ',')}</span></li>
                        <li>Descontos: <span className="">R$ {discount.toFixed(2).replace('.', ',')}</span></li>
                    </ul>
                    <div>
                        <p className="text-xl">Valor final: <span className="text-red-600">R$ {(totalPrice - discount).toFixed(2).replace('.', ',')}</span></p>
                    </div>
                </div>
            </div>
            <div>
                <label className="flex flex-col gap-y-1">
                    Cupom de desconto:
                    <input type="text" className="p-2 border-2 border-black rounded" />
                </label>
            </div>
            <button className="py-3 bg-black rounded-md text-white hover:scale-105 transition-transform">Finalizar compra</button>
        </div>

    );
};
