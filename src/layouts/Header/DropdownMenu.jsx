import { Submenu } from "./Submenu";

export function DropdownMenu(){

    return (
        <nav className="dropdownMenu flex absolute left-0 top-full w-full">
            <ul className="w-full flex flex-col items-center gap-y-4 text-white border-2 border-t border-black border-t-red-600 bg-[linear-gradient(to_right,_transparent,_#00000082,_transparent)] backdrop-blur-lg py-7 text-xl">
                <li className="catalog-items">
                    Masculino
                    <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                </li>
                <li className="catalog-items">
                    Feminino
                    <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                </li> 
                <li className="catalog-items">
                    Infantil
                    <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
                </li>
            </ul>
            <div>
                <Submenu />
            </div>
        </nav>
    );
};
