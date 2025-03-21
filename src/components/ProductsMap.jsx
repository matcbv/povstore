import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserProvider/context";
import { getDoc, setDoc, doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../database/firebase";

export function ProductsMap({ products, loading }){
    const [state, ] = useContext(UserContext);
    const [favorites, setFavorites] = useState({});

    const handleClick = async (productID) => {
        try{
            const productRef = doc(db, 'users', state.uid, 'favorites', productID);
            const product = await getDoc(productRef);
            if(product.exists()){
                await deleteDoc(productRef);
                setFavorites(prevFavorites => {
                    const newFavorites = {...prevFavorites};
                    delete newFavorites[productID]
                    return newFavorites;
                });
            } else{
                await setDoc(productRef, {
                    addedAt: new Date().toLocaleString('pt-BR'),
                });
                setFavorites({...favorites, [productRef.id]: true})
            };
        } catch(e){
            throw new Error(e.message);
        };
    };

    useEffect(() => {
        const getFavorites = async () => {
            if(state.uid){
                try{
                    const userFavorites = await getDocs(collection(db, 'users', state.uid, 'favorites'));
                    userFavorites.docs.map(fav => setFavorites(prevFavorites => ({...prevFavorites, [fav.id]: true})));
                } catch(e){
                    throw new Error(e);
                };
            };
        };
        getFavorites();
    }, [state.uid]);
    
    if(loading){
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-y-10">
                <img className="w-60" src="/assets/images/loading.gif" alt="Caregando" />
                <p className="font-bold text-2xl">Carregando produtos<span className="text-red-600">...</span></p>
            </div>
        );
    };

    return(
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] items-end justify-items-center gap-y-20 gap-x-16">
            {products?.map((prod) => (
                <div
                    key={prod.id}
                    className="w-60 h-[356px] flex flex-col items-center justify-end gap-y-10 relative font-bold transition-transform hover:scale-105 cursor-pointer group"
                >
                    <div className="w-full h-full flex justify-center items-center relative">
                        <img src={prod.imageURL} alt={prod.name} className="object-cover max-h-60" />
                        <span className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></span>
                    </div>    
                    <div className="flex flex-col items-center gap-y-2">
                        <p className="pl-2 border-l-2 border-red-600">{prod.name}</p>
                        <span>
                            <p>R$ {prod.price}</p>
                            <p className="text-sm text-neutral-400">6x de {(Number.parseFloat(prod.price)/6).toFixed(2)}</p>
                        </span>
                    </div>
                    <img
                        src={ favorites[prod.id] ? "/assets/images/favorited.png" : "/assets/images/favorite.png" }
                        alt="Favoritar"
                        className="hidden absolute top-0 right-0 transition-transform group-hover:block hover:scale-110"
                        onClick={ () => handleClick(prod.id) }
                    />
                </div>
            ))}
        </div>
    );
};
