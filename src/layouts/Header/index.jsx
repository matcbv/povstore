import { Link } from "react-router-dom";
import { CartWidget } from "../../components/CartWidget";
import './style.css'

export function Header(){

    const handleClick = () => {
        const submenu = document.querySelector('.submenu');
        const catalogArrow = document.querySelector('.catalogArrow');
        submenu.classList.toggle('showSubmenu');
        catalogArrow.classList.toggle('spinArrow');
    };

    return (
        <header className="flex justify-between border-b border-red-600 px-12 py-4 bg-black sticky top-0 z-10">
            <h1 className="text-5xl text-white"><Link to="/">POV<span className="text-red-600">.</span></Link></h1>
            <nav className="flex items-center">
                <ul className="flex gap-x-6 items-center">
                    <li>
                        <Link className="text-white font-bold" to="/session">Iniciar sessão</Link>
                    </li>
                    <li className="group">
                        <div className="flex items-center gap-x-1 hover:cursor-pointer" onClick={ handleClick }>
                            <p className="text-white font-bold">Catálogo</p>
                            <img src="/assets/images/bottom_arrow.png" alt="Seta para baixo" className="catalogArrow" />
                        </div>
                        <ul className="submenu w-52 flex flex-col gap-y-4 absolute top-full text-white font-bold border-2 border-t border-black border-t-red-600 bg-black/50 backdrop-blur-lg py-7 px-7">
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
                    </li>
                    <li>
                        <Link to="/">
                            <img src="/assets/images/search.png" alt="Pesquisar" />
                        </Link>
                    </li>
                    <li>
                        <CartWidget />
                    </li>
                </ul>
            </nav>
        </header>
    ); 
};
