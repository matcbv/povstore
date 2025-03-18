import { useEffect, useState } from "react";
import { ProductsList } from "./ProductsList";
import { Link } from "react-router-dom";

export function DropdownMenu({ setDropdown }){
    const categoryMap = {
        Masculino: 'men',
        Feminino: 'women',
        Infantil: 'children',
    };

    const [activeGender, setActiveGender] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const updateGender = (gender) => {
        setActiveGender(gender);
        setActiveCategory(null);
    };

    const resetGender = () => {
        setActiveGender(null);
        setActiveCategory(null);
    };

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
                <div className="flex justify-center items-center gap-x-10" onMouseLeave={ () => setActiveGender(null) }>
                    <ul className="flex flex-col gap-y-10 text-white text-xl">
                        {/* Iterando sobre a lista de gêneros */}
                        {["Masculino", "Feminino", "Infantil"].map((gender) => (
                            <li
                                key={gender}
                                className="menu-items relative"
                                onMouseEnter={() => updateGender(gender)}
                                style={{ visibility: activeGender && activeGender !== gender ? 'hidden' : 'visible' }}
                            >
                                <Link to={`/catalog/${categoryMap[gender]}`}>{gender}</Link>
                                <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                            </li>
                        ))}
                    </ul>
                    {activeGender && (
                        <div className="flex gap-x-10 relative left-0" onMouseLeave={ resetGender }>
                            <ul className="flex flex-col justify-center gap-y-10 text-white text-lg">
                                {["Roupas", "Calçados", "Acessórios"].map((category) => (
                                    <li 
                                        key={category}
                                        className="menu-items"
                                        onMouseEnter={() => setActiveCategory(category)}
                                    >
                                        {category}
                                        <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                                    </li>
                                ))}
                            </ul>
                            {/* Passando o gênero e a categoria ativos */}
                            {activeGender && <ProductsList gender={activeGender} category={activeCategory} />}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
