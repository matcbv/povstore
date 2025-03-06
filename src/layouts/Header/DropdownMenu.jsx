import { Submenu } from "./Submenu";

export function DropdownMenu(){

    const showDropdownMenu = (e) => {
        const submenu = document.querySelector('.submenu');
        const genderCategory = document.querySelectorAll('.genderCategory');
        genderCategory.forEach(element => {
            element === e.target ? submenu.classList.add('showSubmenu'): submenu.classList.remove('showSubmenu');
        })
    };

    return (
        <nav className="dropdownMenu absolute left-0 top-full w-full bg-[linear-gradient(to_right,_transparent,_#00000082,_transparent)] backdrop-blur-lg border border-b-2 border-t-red-600 border-b-black" onMouseOver={ showDropdownMenu }>
            <div className="flex justify-center items-center w-full">
                <ul className="flex flex-col gap-y-4 text-white  py-7 text-xl">
                    <li className="flex relative">
                        <div className="catalog-items genderCategory">
                            Masculino
                            <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                        </div>
                    </li>
                    <li className="flex relative">
                        <div className="catalog-items gender">
                            Feminino
                            <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                        </div>
                    </li>
                    <li className="flex relative">
                        <div className="catalog-items gender">
                            Infantil
                            <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                        </div>
                    </li>
                </ul>
                <div>
                    <Submenu />
                </div>
            </div>
        </nav>
    );
};
