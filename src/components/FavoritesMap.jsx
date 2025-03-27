import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserProvider/context";
import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";
import { Link } from "react-router-dom";

export function FavoritesMap(){
    const [state, ] = useContext(UserContext);
    const [favorites, setFavorites] = useState({});

    useEffect(() => {
        const getFavorites = async () => {
            if(state.uid){
                try{
                    const userFavorites = await getDocs(collection(db, 'users', state.uid, 'favorites'));
                    userFavorites.docs.forEach(favorite => getProduct(favorite.id));
                } catch(e){
                    throw new Error(e);
                };
            };
        };
        getFavorites();
    }, [state.uid]);

    const getProduct = async (favoriteID) => {
        const productRef = doc(db, 'products', favoriteID);
        const product = await getDoc(productRef);
        setFavorites(prevFavorites => ({...prevFavorites, [favoriteID]: product.data() }));
    };

    const handleClick = async (favoriteID) => {
        const favoriteRef = doc(db, 'users', state.uid, 'favorites', favoriteID);
        await deleteDoc(favoriteRef);
        const newFavorites = {...favorites};
        delete newFavorites[favoriteID];
        setFavorites(newFavorites);
    };

    if(Object.keys(favorites).length <= 0){
        return (
            <div className="flex flex-col justify-center items-start gap-y-5">
                <h2 className="flex gap-x-2 text-2xl font-bold">
                    Nenhum favorito adicionado
                    <img src="/assets/images/no-favorites.png" alt="Nenhum favorito" />
                </h2>
                    <Link to="/catalog/men" className="flex justify-center py-3 px-5 border-2 border-black rounded-md text-sm font-bold transition-colors hover:bg-black hover:text-white">
                        Veja outros produtos
                    </Link>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] items-end justify-items-center gap-y-20 gap-x-16">
            {
                Object.entries(favorites).map(([k, v]) => (
                    <div
                        key={k}
                        className="w-60 h-[356px] flex flex-col items-center justify-end gap-y-5 relative font-bold transition-transform cursor-pointer group"
                    >
                        <div className="w-full h-full flex justify-center items-center relative">
                            <img src={v.imageURL} alt={v.imageURL} className="object-cover max-h-60" />
                            <span className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></span>
                        </div>    
                        <div className="flex flex-col items-center gap-y-5">
                            <p className="pl-2 border-l-2 border-red-600">{v.name}</p>
                            <button
                                type="button"
                                className="border-2 border-black px-4 py-1 rounded-sm transition-colors hover:border-red-600"
                                onClick={ () => handleClick(k) }
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};