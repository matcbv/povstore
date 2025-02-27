import { Link } from "react-router-dom";
import { CartWidget } from "../components/CartWidget";

export function Header(){
    return (
        <header className="flex justify-between border-b border-red-600 px-12 py-4 bg-black sticky top-0 z-10">
            <h1 className="text-5xl text-white"><Link to="/">POV<span className="text-red-600">.</span></Link></h1>
            <nav className="flex items-center">
                <div className="flex items-center gap-x-6">
                    <Link className="text-white" to="/session">Iniciar sessão</Link>
                    <Link to="/"><img src="/assets/images/search.png" alt="Pesquisar" /></Link>
                    <CartWidget />
                </div>
            </nav>
        </header>
    ); 
};
