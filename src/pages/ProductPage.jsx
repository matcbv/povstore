import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from '../utils/getProduct';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserProvider/context';
import { CheckoutContext } from '../contexts/CheckoutProvider/context';
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../database/firebase';
import { actionTypes } from '../contexts/CheckoutProvider/actionTypes';
import { toast } from 'react-toastify';
import { addItemToBag } from '../utils/addItemToBag';

export function ProductPage(){
    const navigate = useNavigate();
    const params = useParams();

    const [userState, ] = useContext(UserContext);
    const [, checkoutDispatch] = useContext(CheckoutContext)

    const [product, setproduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const callGetProduct = async () => {
            const productData = await getProduct(params.productId);
            setproduct(productData);
        };
        callGetProduct();
    }, [params.productId]);

    useEffect(() => {
        if(userState.uid){
            const callGetDoc = async () => {
                try{
                    const favoriteRef = doc(db, 'users', userState.uid, 'favorites', params.productId);
                    const favoriteSnap = await getDoc(favoriteRef);
                    favoriteSnap.exists() && setIsFavorite(true);
                } catch(e){
                    throw new Error(e.message);
                };
            };
            callGetDoc();
        };
    });

    const handleFavorite = async () => {
        if(userState.uid){
            try{
                const favoriteRef = doc(db, 'users', userState.uid, 'favorites', params.productId);
                const favoriteSnap = await getDoc(favoriteRef);
                if(favoriteSnap.exists()){
                    deleteDoc(favoriteRef);
                    setIsFavorite(false);
                } else{
                    // Abaixo, utilizaremos o setDoc, pois como estamos atendendo a codição de que a referência não existe, o addDoc geraria um ID automático para criar o documento. Essa, que terá o ID do produto passado para a referência criada acima.
                    await setDoc(favoriteRef, {
                        addedAt: new Date().toLocaleString('pt-BR'),
                    });
                    setIsFavorite(true);
                };
            } catch(e){
                throw new Error(e.message);
            };
        };
    };

    const handleCheckout = async () => {
        if(selectedSize){
            const result = await addItemToBag(userState.uid, {
                imageURL: product.imageURL,
                name: product.name,
                price: product.price,
                quantity,
            });
            if(result.success){
                checkoutDispatch({ type: actionTypes.INCREMENT });
                toast.success('Item adicionado com sucesso à sacola.');
            } else{
                throw new Error(result.error);
            };
        } else{
            toast.error('Selecione um tamanho para o item.');
        };
    };
    
    return(
        <>
            <Header />
            <main className='w-full flex justify-center items-center h-screen bg-[radial-gradient(circle,_white_60%,_#bdbdbd)]'>
                <section className='flex items-center gap-x-20 w-full max-w-screen-xl m-20 font-bold'>
                    <img src={product.imageURL} alt={product.name} />
                    <div>
                        <div className="w-full flex justify-between pb-10">
                            <div className='flex items-center gap-x-5'>
                                <h1 className="text-2xl md:text-3xl underline decoration-red-600 underline-offset-4">{product.name}</h1>
                                <img
                                    src={ isFavorite ? "/assets/images/favorited.png" : "/assets/images/favorite.png"}
                                    alt="Favoritar"
                                    className="cursor-pointer transition-transform hover:scale-110"
                                    onClick={ handleFavorite }
                                />
                            </div>
                            <span className="flex flex-col items-center cursor-pointer font-bold" onClick={() => navigate(-1)}>
                                    <img src="/assets/images/return.png" alt="Voltar" />
                                    <p>Voltar</p>
                            </span>
                        </div>
                        <div className='flex flex-col gap-y-12'>
                            <p className='text-lg border-l-2 border-l-red-600 pl-4'>{product.description}</p>
                            <span>
                                <p className='text-2xl'>R$ {product.price}</p>
                                <p className="text-neutral-400">até 6x de R${(Number.parseFloat(product.price)/6).toFixed(2).replace('.', ',')} sem juros</p>
                            </span>
                            <div className='flex flex-col gap-y-2'>
                                <p className='text-lg'>Tamanho:</p>
                                <div className='flex gap-x-5'>
                                    {['P', 'M', 'G'].map(size => (
                                        <span
                                            className='flex justify-center items-center w-10 h-10 border-2 border-black rounded-full cursor-pointer'
                                            key={size}
                                            style={{ 'borderColor': selectedSize === size ? "#dc2626" : "black"}}
                                            onClick={ () => setSelectedSize(size) }
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className='flex gap-x-10'>
                                <button
                                    type='submit'
                                    className='bg-black rounded-md px-8 py-2 font-mono text-white hover:scale-105 transition-transform'
                                    onClick={ handleCheckout }
                                >
                                    Adicionar ao carrinho
                                </button>
                                <div className='flex flex-col items-center gap-y-1'>
                                    <p>Quantidade:</p>
                                    <span className='w-full flex justify-around'>
                                        <img
                                            src="/assets/images/decrease.png"
                                            alt="Diminuir"
                                            className='cursor-pointer'
                                            onClick={ () => quantity > 1 && setQuantity(prev => prev -1) }
                                        />
                                        <span>{quantity}</span>
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
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};
