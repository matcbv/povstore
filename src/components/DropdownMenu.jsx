import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { catalogMap, categoriesMap, gendersMap, getPath } from "../utils/getPath";

export function DropdownMenu({ setDropdown }){
    const [activeOptions, setActiveOptions] = useState({
        gender: null,
        category: null,
    });
    
    const [isVisible, setIsVisible] = useState(false);

    const delayDropdown = () => {
        setIsVisible(prev => !prev);
        setTimeout(() => setDropdown(prev => !prev), 300);
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <nav
        className="flex justify-end absolute left-0 top-full w-full bg-black/90 backdrop-blur-md border border-t-red-600 border-b-black h-80"
        onMouseLeave={ delayDropdown }
        style={{
            opacity: isVisible ? 1 : 0,
            visibility: isVisible ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
        }}
        >
            <div className="flex justify-center w-full">
                <div className="flex justify-center items-center gap-x-10" onMouseLeave={ () => setActiveOptions({gender: null, category: null}) }>
                    <ul className="flex flex-col gap-y-10 text-white text-xl">
                        {/* Iterando sobre a lista de gêneros */}
                        {Object.entries(gendersMap).map(([gender, slug]) => (
                            <li
                                key={slug}
                                className="menu-items relative"
                                onMouseEnter={() => setActiveOptions( {...activeOptions, gender: slug} )}
                                style={{ visibility: activeOptions.gender && activeOptions.gender !== slug ? 'hidden' : 'visible' }}
                            >
                                <Link to={getPath(slug)}>{gender}</Link>
                                <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                            </li>
                        ))}
                    </ul>
                    {activeOptions.gender && (
                        <div className="flex gap-x-10 relative left-0" onMouseLeave={ () => setActiveOptions({...activeOptions, gender: null}) }>
                            <ul className="flex flex-col justify-center gap-y-10 text-white text-lg">
                                {Object.entries(categoriesMap).map(([category, slug]) => (
                                    <li 
                                        key={slug}
                                        className="menu-items"
                                        onMouseEnter={ () => setActiveOptions({...activeOptions, category: slug}) }
                                    >
                                        <Link to={getPath(activeOptions.gender, slug)}>{category}</Link>
                                        <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                                    </li>
                                ))}
                            </ul>
                            {/* Passando o gênero e a categoria ativos */}
                            {activeOptions.category && (
                                <ul className="flex flex-col justify-center gap-y-5 w-40 text-white text-md">
                                    {/* Realizando a iteração dos produtos com base no gênero e categoria ativos */}
                                    {Object.entries(catalogMap[activeOptions.gender][activeOptions.category]).map(([name, slug]) => (
                                        <li key={slug} className="product-item cursor-pointer hover:font-bold">
                                            <Link to={getPath(activeOptions.gender, activeOptions.category, slug)}>{name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
