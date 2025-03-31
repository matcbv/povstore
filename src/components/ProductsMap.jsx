import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserProvider/context";
import { getDoc, setDoc, doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../database/firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductProvider/context";
import { actionTypes } from "../contexts/ProductProvider/actionTypes";

export function ProductsMap({ products }){
    const navigate = useNavigate();
    const params = useParams();
    const [userState, ] = useContext(UserContext);
    const [productState, productDispatch] = useContext(ProductContext);
    const [favorites, setFavorites] = useState({});

    const handleFavorite = async (productID) => {
        if(userState.uid){
            try{
                const productRef = doc(db, 'users', userState.uid, 'favorites', productID);
                const productSnap = await getDoc(productRef);
                if(productSnap.exists()){
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
        } else{
            navigate('/session');
        };
    };

    useEffect(() => {
        const getFavorites = async () => {
            if(userState.uid){
                try{
                    const userFavorites = await getDocs(collection(db, 'users', userState.uid, 'favorites'));
                    userFavorites.docs.map(fav => setFavorites(prevFavorites => ({...prevFavorites, [fav.id]: true})));
                } catch(e){
                    throw new Error(e);
                };
            };
        };
        getFavorites();
    }, [userState.uid]);
    
    if(productState.loading){
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-y-10">
                <img className="w-60" src="/assets/images/loading.gif" alt="Caregando" />
                <p className="font-bold text-2xl">Carregando produtos<span className="text-red-600">...</span></p>
            </div>
        );
    };

    if(products){
        if(products.length <= 0){
            return(
                <div className="flex flex-col items-start gap-y-5">
                    <h2 className="text-2xl font-bold">Ainda não há produtos nessa seção<span className="text-red-600">.</span></h2>
                    <Link
                        to={`/catalog/${params.gender}`}
                        className="flex justify-center py-3 px-5 border-2 border-black rounded-md text-sm font-bold transition-colors hover:bg-black hover:text-white"
                        onClick={ () => productDispatch({ type: actionTypes.SET_ACTIVE_CATEGORY, payload: null }) }
                    >
                        Veja outros produtos
                    </Link>
                </div>
            );
        };

        return(
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(224px,_1fr))] items-end justify-items-center gap-y-20 gap-x-16">
                {products.map((prod) => (
                        <div
                            key={prod.id}
                            className="w-56 h-[356px] flex flex-col items-center justify-end gap-y-10 relative font-bold transition-transform hover:scale-105 cursor-pointer group"
                            onClick={ () => navigate(`/catalog/product/${prod.id}`) }
                        >
                            <div className="w-full h-full flex justify-center items-center relative">
                                <img src={prod.imageURL} alt={prod.name} className="object-cover max-h-60" />
                                <span className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></span>
                            </div>    
                            <div className="flex flex-col items-center gap-y-2">
                                <p className="pl-2 border-l-2 border-red-600">{prod.name}</p>
                                <span className="flex flex-col items-center">
                                    <p>R$ {prod.price}</p>
                                    <p className="text-sm text-neutral-400">6x de R${(Number.parseFloat(prod.price)/6).toFixed(2).replace('.', ',')}</p>
                                </span>
                            </div>
                            <img
                                src={ favorites[prod.id] ? "/assets/images/favorited.png" : "/assets/images/favorite.png" }
                                alt="Favoritar"
                                className="w-6 hidden absolute top-0 right-0 transition-transform group-hover:block hover:scale-110"
                                onClick={ () => handleFavorite(prod.id) }
                            />
                        </div>
                    ))}
            </div>
        );
    };
};
