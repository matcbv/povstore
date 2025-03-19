import { useContext } from "react";
import { addFavorite } from "../database/addFavorite";
import { UserContext } from "../contexts/UserProvider/context";

export function ProductsMap({ products, loading }){
    const [state, ] = useContext(UserContext);

    const handleClick = (productID) => {
        addFavorite(state.uid, productID);
    };

    if(loading){
        return (
            <div>
                <img src="" alt="Caregando" />
                <p>Carregando produtos...</p>
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
                        src="/assets/images/favorite.png"
                        alt="Favoritar"
                        className="hidden absolute top-0 right-0 transition-transform group-hover:block hover:scale-110"
                        onClick={ () => handleClick(prod.id) }
                    />
                </div>
            ))}
        </div>
    );
};
