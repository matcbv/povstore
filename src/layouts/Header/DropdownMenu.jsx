import { useState } from "react";
import { Submenu } from "./Submenu";

export function DropdownMenu(){
    const genders = ["Masculino", "Feminino", "Infantil"];
    const categories = ["Roupas", "Calçados", "Acessórios"];

    const [activeGender, setActiveGender] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null); 

    const handleMouseOver = (e, gender) => {
        const items = document.querySelector('.genderList').querySelectorAll('li');
        items.forEach(element => {
            element === e.currentTarget ? element.style.visibility = 'visible' : element.style.visibility = 'hidden';
        });

        const categoriesList = document.querySelector('.categoriesList');
        categoriesList.classList.add('showCategoriesList');

        setActiveGender(gender);
        setActiveCategory(null);
    };

    const handleMouseLeave = (e) => {
        const categoriesList = document.querySelector('.categoriesList');
        console.log(e.target);
        if(!categoriesList.contains(e.target)){
            categoriesList.classList.remove('showCategoriesList');
        };
    };

    const handleCategoryHover = category => setActiveCategory(category);

    return (
        <nav className="dropdownMenu flex justify-end absolute left-0 top-full w-full bg-[linear-gradient(to_right,_transparent,_#00000082,_transparent)] backdrop-blur-lg border-t border-t-red-600 border-b-2 border-b-black h-80">
            <div className="flex justify-center items-center w-full" onMouseLeave={ handleMouseLeave }>
                <ul className="genderList flex flex-col gap-y-8 w-40 text-white text-xl">
                    {genders.map((gender) => (
                        <li
                            key={gender}
                            className="catalog-items relative"
                            onMouseEnter={(e) => handleMouseOver(e, gender)}
                        >
                            {gender}
                            <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                        </li>
                    ))}
                </ul>
                <div className="categoriesContainer flex relative left-0">
                    <ul className="categoriesList flex-col justify-center gap-y-8 w-40 text-white text-lg">
                        {categories.map((category) => (
                            <li 
                                key={category} 
                                className="catalog-items categoriesItems"
                                onMouseEnter={() => handleCategoryHover(category)}
                            >
                                {category}
                                <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                            </li>
                        ))}
                    </ul>
                    {activeGender && (
                        <Submenu 
                            gender={activeGender}
                            activeCategory={activeCategory}
                        />
                    )}
                </div>
            </div>
        </nav>
    );
};
