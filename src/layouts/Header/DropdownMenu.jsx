import { useState } from "react";
import { Submenu } from "./Submenu";

export function DropdownMenu({ setDropdown }){
    const genders = ["Masculino", "Feminino", "Infantil"];
    const categories = ["Roupas", "Calçados", "Acessórios"];

    const [activeGender, setActiveGender] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [isVisible, setIsVisible] = useState(true);

    const handleMouseEnter = (gender) => {
        setActiveGender(gender);
        setActiveCategory(null);
    };

    const handleMouseLeave = () => {
        setActiveGender(null);
        setActiveCategory(null);
    };

    const delayDropdown = () => {
        setIsVisible(false);
        setTimeout(() => setDropdown(false), 300);
    };

    return (
        <nav
        className="flex justify-end absolute left-0 top-full w-full bg-black/85 backdrop-blur-md border border-t-red-600 border-b-black h-80"
        onMouseLeave={ delayDropdown }
        style={{
            opacity: isVisible ? 1 : 0,
            visibility: isVisible ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease-in-out, visibility 0s linear 0.3s',
        }}
        >
            <div className="flex justify-center w-full">
                <div className="flex justify-center items-center gap-x-10" onMouseLeave={ () => setActiveGender(null) }>
                    <ul className="flex flex-col gap-y-10 text-white text-xl">
                        {genders.map((gender) => (
                            <li
                                key={gender}
                                className="catalog-items"
                                onMouseEnter={() => handleMouseEnter(gender)}
                                style={{ visibility: activeGender && activeGender !== gender ? 'hidden' : 'visible' }}
                            >
                                {gender}
                                <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                            </li>
                        ))}
                    </ul>
                    {activeGender && (
                        <div className="flex relative left-0 gap-x-10" onMouseLeave={ handleMouseLeave }>
                            <ul className="flex flex-col justify-center gap-y-10 text-white text-lg">
                                {categories.map((category) => (
                                    <li 
                                        key={category} 
                                        className="catalog-items categoriesItems"
                                        onMouseEnter={() => setActiveCategory(category)}
                                    >
                                        {category}
                                        <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                                    </li>
                                ))}
                            </ul>
                            {activeGender && <Submenu gender={activeGender} activeCategory={activeCategory} />}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
