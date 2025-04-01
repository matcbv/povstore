import { useContext } from "react";
import { CheckoutContext } from "../contexts/CheckoutProvider/context";
import { Link } from "react-router-dom";

export function CheckoutList() {
    const [state, ] = useContext(CheckoutContext);
    const setQuantity = () => {

    }

    if(state.length <= 0){
        return (
            <div className="flex flex-col items-start gap-y-5 font-bold">
                <p className="text-lg">Ops... Ainda não há nenhum item aqui.</p>
                <Link to='/catalog' className="bg-black text-white p-3 px-6 rounded transition-transform hover:scale-105">Continuar comprando</Link>
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
                        <div className='flex flex-col items-center gap-y-1'>
                            <p>Quantidade:</p>
                            <span className='w-full flex justify-around'>
                                <img
                                    src="/assets/images/decrease.png"
                                    alt="Diminuir"
                                    className='cursor-pointer'
                                    onClick={ () => item.quantity > 1 && setQuantity(prev => prev -1) }
                                />
                                <span>{item.quantity}</span>
                                <img
                                    src="/assets/images/increase.png"
                                    alt="Aumentar"
                                    className='cursor-pointer'
                                    onClick={ () => setQuantity(prev => prev + 1) }
                                />
                            </span>
                        </div>
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