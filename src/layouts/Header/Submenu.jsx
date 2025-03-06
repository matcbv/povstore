export function Submenu(){
    return (
        <ul className="w-full flex flex-col items-center gap-y-4 absolute left-0 text-white text-lg">
            <li className="catalog-items">
                Roupas
                <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
            </li>
            <li className="catalog-items">
                Calçados
                <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
            </li> 
            <li className="catalog-items">
                Acessórios
                <img src="/assets/images/catalog_right_arrow.png" alt="Seta para direita" />
            </li>
        </ul>
    )
};
