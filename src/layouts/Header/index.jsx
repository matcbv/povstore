import { Link } from "react-router-dom";
import { CartWidget } from "../../components/CartWidget";
import './style.css'
import { DropdownMenu } from "./DropdownMenu";

export function Header(){

    const handleClick = () => {
        const submenu = document.querySelector('.dropdownMenu');
        const catalogArrow = document.querySelector('.catalogArrow');
        submenu.classList.toggle('showDropdownMenu');
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
            <DropdownMenu />
        </header>
    ); 
};
