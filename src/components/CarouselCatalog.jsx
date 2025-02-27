import { useContext } from "react";
import { CartContext } from "../contexts/CartProvider/context";
import { action_types } from "../contexts/CartProvider/action_types";

export function CarouselCatalog(){
    const [, dispatch] = useContext(CartContext);

    return (
        <section className='flex flex-col items-center px-4 md:px-0'>
            <h1 className='text-2xl md:text-4xl font-bold mt-16 md:mt-24'>Coleção da estação<span className='text-red-600'>.</span></h1>
            <div className='flex items-center my-16 md:my-24'>
                <img src="/assets/images/left_arrow.png" alt="Item anterior" className='hover:cursor-pointer' />
                <div className='flex flex-col items-center mx-5 md:flex-row md:mx-20 hover:cursor-pointer'>
                    <img src="/assets/images/overcoat.png" alt="Sobretudo" />
                    <div className='flex flex-col justify-center mt-4 md:mt-0 md:ml-8 max-w-80 gap-y-6'>
                        <h2 className='text-lg md:text-xl font-mono border-b border-red-600'>Sobretudo Cinza Elegante</h2>
                        <p className="text-sm">Um item essencial para os dias frios, esse sobretudo cinza combina classe e funcionalidade. Com corte alongado e fechamento em botões, proporciona um visual refinado e proteção contra o frio sem perder a elegância.</p>
                        <button onClick={() => dispatch({type: action_types.INCREMENT})} type="button" className="addItemBtn border border-black text-sm font-mono font-bold py-2 rounded-md hover:scale-105 transition">Adicionar à sacola</button>
                    </div>
                </div>
                <img src="/assets/images/right_arrow.png" alt="Próximo item" className='hover:cursor-pointer' />
            </div>
        </section>
    );
};
