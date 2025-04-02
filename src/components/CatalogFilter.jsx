import { Link, useNavigate } from "react-router-dom";
import { categoriesMap, gendersMap, getPath } from "../utils/getPath";
import { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductProvider/context";
import { catalogMap } from "../utils/getPath";
import { actionTypes } from "../contexts/ProductProvider/actionTypes";

export function CatalogFilter(){
    const navigate = useNavigate();
    const [state, dispatch] = useContext(ProductContext);
    const [isVisible, setIsVisible] = useState(true);

    const clearFilters = () => {
        dispatch({ type: actionTypes.SET_ACTIVE_CATEGORY, payload: null });
        dispatch({ type: actionTypes.SET_ACTIVE_SUBCATEGORY, payload: null });
        /*
            É necessário redirecionarmos nossa página pois mesmo após limpar nossos estados, a URL continua com os valores de category e subcategory. Dessa forma, após a re-renderização, nosso useEffect de ProductsCatalog volta a adicionar os filtros nos estados.

            Obs.: Com replace, podemos optar com que a URL atual substitua a anterior no histórico do navegador, impedindo que o usuário retorne à ela.
        */
        navigate(getPath(state.activeGender), { replace: true });
    };

    const hideFilters = () => {
        setIsVisible(prev => !prev);
    };

    if(!isVisible){
        return (
            <span className="h-screen">
                <img 
                    src="/assets/images/show-filters.png"
                    alt="Exibir filtros"
                    className="fixed top-1/2 left-2 cursor-pointer transition-transform hover:translate-x-2"
                    onClick={ hideFilters }
                />
            </span>
        );
    };

    return (
        <nav className="h-screen w-80 flex flex-col gap-y-10 sticky top-20 py-20 px-5 bg-black/90 shadow-[20px_0px_30px_rgba(0,0,0,0.2)] text-white font-bold overflow-y-scroll scrollbar-none">
            <div className="w-full flex flex-col gap-y-10">
                <h2 className="text-2xl border-b border-b-red-600">Filtros</h2>
                <div className="flex flex-col gap-y-10">
                    <div className="flex flex-col gap-y-5">
                        <h3 className="text-xl">Gênero</h3>
                        <ul className="flex flex-col gap-y-2 pl-2">
                            {Object.entries(gendersMap).map(([gender, slug]) => (
                                <li key={slug} className="flex transition-transform hover:translate-x-2 cursor-pointer">
                                    <img src="/assets/images/catalog_right_arrow.png" alt={gender} />
                                    <Link to={getPath(slug)}>
                                        {state.activeGender === slug ? gender +' ✓' : gender}
                                    </Link>
                                </li>
                            ))}    
                        </ul>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <h3 className="text-xl">Categoria</h3>
                        <ul className="flex flex-col gap-y-2 pl-2">
                            {Object.entries(categoriesMap).map(([category, slug]) => (
                                <li key={slug} className="flex transition-transform hover:translate-x-2 cursor-pointer">
                                    <img src="/assets/images/catalog_right_arrow.png" alt={category} />
                                    <Link to={getPath(state.activeGender, slug)}>
                                        {state.activeCategory === slug ? category +' ✓' : category}
                                    </Link>
                                </li>
                            ))}    
                        </ul>
                    </div>
                    {state.activeCategory && (
                        <div className="flex flex-col gap-y-5">
                            <h3 className="text-lg">Tipo de produto</h3>
                            <ul className="flex flex-col gap-y-2 pl-2">
                                {/* Realizando o mapeamento do mapa do catálogo, obtendo os respectivos nome e apelido do gênero e categoria atuais: */}
                                {Object.entries(catalogMap[state.activeGender][state.activeCategory]).map(([name, slug]) => (
                                    <li key={slug} className="flex transition-transform hover:translate-x-2 cursor-pointer">
                                        <img src="/assets/images/catalog_right_arrow.png" alt={name} />
                                        <Link to={getPath(state.activeGender, state.activeCategory, slug)}>
                                            {state.activeSubcategory === slug ? name +' ✓' : name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <button
                type="button"
                className="w-full flex items-center justify-center gap-x-1 py-2 px-4 border border-white rounded-md text-sm transition-colors hover:bg-black"
                onClick={ clearFilters }
            >   
                <img src="/assets/images/remove.png" alt="Limpar filtros" />
                Limpar filtros
            </button>
            <span 
                className="absolute top-2 right-4 transition-transform translate-x-1/2 hover:scale-105 cursor-pointer"
                onClick={ hideFilters }
            >
                <img src="/assets/images/hide-filters.png" alt="Esconder filtros" /> 
            </span>
        </nav>
    );
};
