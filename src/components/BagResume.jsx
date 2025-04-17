import { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "../contexts/CheckoutProvider/context";
import { actionTypes } from "../contexts/CheckoutProvider/actionTypes";

export function BagResume(){
    const [state, dispatch] = useContext(CheckoutContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, ] = useState(0);

    useEffect(() => {
        const newTotalPrice = state.items.reduce((acc, item) => acc + (parseFloat(item.price.replace(',', '.')) * item.quantity ), 0);
        setTotalPrice(newTotalPrice);
    }, [state.items]);

    useEffect(() => {
        dispatch({ type: actionTypes.SET_FINAL_PRICE, payload: totalPrice - discount });
    }, [dispatch, discount, totalPrice]);

    return (
        <div className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-10 w-[350px] px-5 py-10 rounded border-2 border-black shadow-lg">
                <h2 className="text-xl font-bold">Resumo da compra</h2>
                <div className="flex flex-col gap-y-10">
                    <ul className="flex flex-col gap-y-5">
                        <li>Número de itens: <span>{state.totalQuantity}</span></li>
                        <li>Valor total: <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span></li>
                        <li>Descontos: <span>R$ {discount.toFixed(2).replace('.', ',')}</span></li>
                    </ul>
                    <div>
                        <p className="text-xl font-bold">Valor final: <span className="text-red-600">R$ {(state.finalPrice).toFixed(2).replace('.', ',')}</span></p>
                    </div>
                </div>
            </div>
            <div>
                <label className="flex flex-col gap-y-1">
                    Cupom de desconto:
                    <input type="text" className="p-2 border-2 border-black rounded" />
                </label>
            </div>
        </div>
    );
};
