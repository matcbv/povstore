import { Submenu } from "./Submenu";

export function DropdownMenu(){

    const showDropdownMenu = (e) => {
        const element = e.target;
        const submenu = document.querySelector('.submenu');
        const gendersList = document.querySelectorAll('.gender');
        gendersList.forEach(item => {
            console.log(element, item)
            if(element === item){
                console.log('opa')
                submenu.classList.add('showSubmenu');
            };
        });
    };

    return (
        <nav className="dropdownMenu absolute left-0 top-full w-full" onMouseOver={ showDropdownMenu }>
            <div className="flex justify-center items-center w-full">
                <ul className="flex flex-col gap-y-4 text-white border-b-2 border-t border-black border-t-red-600 bg-[linear-gradient(to_right,_transparent,_#00000082,_transparent)] backdrop-blur-lg py-7 text-xl">
                    <li className="flex relative">
                        <div className="catalog-items gender">
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
