import { useContext } from "react";
import { CheckoutContext } from "../contexts/CheckoutProvider/context";
import { Link } from "react-router-dom";

export function CheckoutList() {
    const [state, ] = useContext(CheckoutContext);

    if(state.length <= 0){
        return (
            <div className="flex flex-col items-start gap-y-14">
                <h1 className="text-3xl font-bold">Sacola de compras</h1>
                <div className="flex flex-col items-start gap-y-4">
                    <p className="font-bold">Ops... Ainda não há nenhum item aqui.</p>
                    <Link to='/' className="bg-black text-white p-3 px-6 font-bold rounded">Continuar comprando</Link>
                </div>
            </div>
        );
    };
    
    return (
        <div>
            {state.map(item => (
                <div className="flex font-bold" key={item.name}>
                    <img src={item.imageURL} alt={item.name} />
                    <div className="flex flex-col ">
                        <h2>{item.name}</h2>
                        <p>Preço: {item.price}</p>
                        <p>Quantidade: {item.quantity}</p>
                    </div>
                </div>
            ))}
            <div className="w-[350px] py-10 px-5 rounded border-2 border-black">
                <h2 className="text-xl mb-8 font-bold">Resumo da compra</h2>
                <div className="flex flex-col gap-y-8">
                    <ul className="flex flex-col gap-y-2">
                        <li>Número de itens: <span className="text-red-600">0</span></li>
                        <li>Valor total: <span className="text-red-600">R$ 00,00</span></li>
                        <li>Descontos:</li>
                    </ul>
                    <div>
                        <p className="font-bold">Valor final: <span className="text-red-600">R$ 00.00</span></p>
                    </div>
                </div>
            </div>
        </div>
        
    )

}