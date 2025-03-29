import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from '../utils/getProduct';
import { useEffect, useState } from 'react';

export function ProductPage(){
    const navigate = useNavigate();
    const params = useParams();
    const [product, setproduct] = useState({});
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        const callGetProduct = async () => {
            const productData = await getProduct(params.productId);
            setproduct(productData);
        };
        callGetProduct();
    }, [params.productId]);

    const handleClick = (increase) => {
        if(!increase){
            counter > 1 && setCounter(prev => prev -1)
        } else{
            setCounter(prev => prev + 1)
        };
    };
    
    return(
        <>
            <Header />
            <main className='w-full flex justify-center items-center h-screen bg-[radial-gradient(circle,_white_50%,_#bdbdbd)]'>
                <section className='flex items-center gap-x-20 max-w-screen-lg font-bold'>
                    <img src={product.imageURL} alt={product.name} />
                    <form>
                        <div className="w-full flex justify-between pb-10">
                            <h1 className="text-2xl md:text-3xl underline decoration-red-600 underline-offset-4">{product.name}</h1>
                            <span className="flex flex-col items-center cursor-pointer font-bold" onClick={() => navigate(-1)}>
                                    <img src="/assets/images/return.png" alt="Voltar" />
                                    <p>Voltar</p>
                            </span>
                        </div>
                        <div className='flex flex-col gap-y-12'>
                            <p className='text-lg border-l-2 border-l-red-600 pl-4'>{product.description}</p>
                            <span>
                                <p className='text-2xl'>R$ {product.price}</p>
                                <p className="text-neutral-400">até 6x de {(Number.parseFloat(product.price)/6).toFixed(2).replace('.', ',')} sem juros</p>
                            </span>
                            <div className='flex flex-col gap-y-2'>
                                <p className='text-lg'>Tamanho:</p>
                                <div className='flex gap-x-5'>
                                    {['P', 'M', 'G'].map(size => (
                                        <span className='flex flex-col items-center' key={size}>
                                            <label htmlFor={size} className='text-lg'>{size}</label>
                                            <input type="radio" name="size" id={size} value={size} className='w-5 h-5 accent-red-600' />
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className='flex gap-x-10'>
                                <button type='submit' className='bg-black rounded-md px-8 py-2 font-mono text-white hover:scale-105 transition-transform'>Adicionar ao carrinho</button>
                                <div className='flex flex-col items-center gap-y-1'>
                                    <p>Quantidade:</p>
                                    <span className='w-full flex justify-around'>
                                        <img
                                            src="/assets/images/decrease.png"
                                            alt="Diminuir"
                                            className='cursor-pointer'
                                            onClick={ () => handleClick(false) }
                                        />
                                        <span>{counter}</span>
                                        <img
                                            src="/assets/images/increase.png"
                                            alt="Aumentar"
                                            className='cursor-pointer'
                                            onClick={ () => handleClick(true) }
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
};
