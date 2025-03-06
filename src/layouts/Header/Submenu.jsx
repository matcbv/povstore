export function Submenu(){
    return (
        <ul className="submenu flex-col items-center gap-y-4 text-white text-lg">
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
