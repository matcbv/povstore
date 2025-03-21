import { useNavigate } from "react-router-dom"
import { Footer } from "../layouts/Footer"
import { Header } from "../layouts/Header"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserProvider/context";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";

export function Favorites(){
    const [state, ] = useContext(UserContext);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState({});

    useEffect(() => {
        const getFavorites = async () => {
            if(state.uid){
                try{
                    const userFavorites = await getDocs(collection(db, 'users', state.uid, 'favorites'));
                    userFavorites.docs.forEach(favorite => {
                        getProduct(favorite.id);
                    });
                } catch(e){
                    throw new Error(e);
                };
            };
        };
        getFavorites();
    }, [state.uid]);

    const getProduct = async (favorite) => {
        const productRef = doc(db, 'products', favorite);
        const product = await getDoc(productRef);
        setFavorites(prevFavorites => ({...prevFavorites, [product.id]: product.data() }))
    };

    return (
        <>
            <Header />
            <main className="flex">
                <section className="w-full flex flex-col m-20 text-black">
                    <div className="w-full flex justify-between pb-20">
                        <h1 className="text-2xl md:text-3xl font-bold">Seus <span className="underline decoration-red-600 underline-offset-4">favoritos</span></h1>
                        <span className="flex flex-col items-center cursor-pointer font-bold" onClick={() => navigate(-1)}>
                                <img src="/assets/images/return.png" alt="Voltar" />
                                <p>Voltar</p>
                        </span>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] items-end justify-items-center gap-y-20 gap-x-16">
                        {
                            Object.keys(favorites).map(key => (
                                <div
                                    key={key}
                                    className="w-60 h-[356px] flex flex-col items-center justify-end gap-y-5 relative font-bold transition-transform hover:scale-105 cursor-pointer group"
                                >
                                    <div className="w-full h-full flex justify-center items-center relative">
                                        <img src={favorites[key].imageURL} alt={favorites[key].imageURL} className="object-cover max-h-60" />
                                        <span className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></span>
                                    </div>    
                                    <div className="flex flex-col items-center gap-y-2">
                                        <p className="pl-2 border-l-2 border-red-600">{favorites[key].name}</p>
                                    </div>
                                    <img
                                        src="/assets/images/favorited.png"
                                        alt="Favoritar"
                                        className="hidden absolute top-0 right-0 transition-transform group-hover:block hover:scale-110"
                                        // onClick={ () => handleClick(key) }
                                    />
                                </div>
                            ))
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};
