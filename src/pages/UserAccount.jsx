import { useContext } from "react";
import { Footer } from "../layouts/Footer";
import { Header } from "../layouts/Header";
import { UserContext } from "../contexts/UserProvider/context";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../database/auth";

export function UserAccount(){
    const navigate = useNavigate();
    const [state, ] = useContext(UserContext);

    const handleClick = () => {
        try{
            logout();
            navigate('/');
        }catch(e){
            throw new Error(e.message);
        };
    };

    const addressExists = () => {
        if (state.address) {
            return (
                <>
                    <p>Endereço</p>
                </>
            );
        } else {
            return (
                <>
                    <h2 className="text-lg md:text-xl font-bold">Endereço principal<span className="text-red-600">:</span></h2>
                    <div className="flex flex-col items-start gap-y-4">
                        <p className="md:text-lg">Nenhum endereço cadastrado<span className="text-red-600">.</span></p>
                        <Link to="/account/editProfile" className="bg-black rounded-md px-4 py-2 text-sm font-mono text-white hover:scale-105 transition-transform">Adicionar endereço</Link>
                    </div>
                </>
            );
        };
    };

    return (
        <>
            <Header />
            <main className="flex flex-col gap-y-20 min-h-screen my-20">
                <div className="flex justify-between items-center px-8 md:px-40">
                    <h1 className="text-2xl md:text-4xl font-bold">Conta de <span className="underline decoration-red-600 underline-offset-4">{state.name}</span></h1>
                    <span className="flex flex-col items-center cursor-pointer font-bold" onClick={ handleClick }>
                        <img src="/assets/images/sign_out.png" alt="Sair" />
                        Sair
                    </span>
                </div>
                <section className="flex flex-col md:flex-row items-center md:items-stretch gap-y-20 md:gap-y-0 justify-center md:gap-x-10 lg:gap-x-40 text-black">
                    <div className="flex flex-col gap-y-20">
                        <div className="flex flex-col gap-y-8">
                            {addressExists()}
                        </div>
                        <div className="flex flex-col gap-y-4 md:gap-y-8">
                            <Link className="account-options">Editar dados da conta</Link>
                            <Link className="account-options">Favoritos</Link>
                            <Link className="account-options">Meus pedidos</Link>
                            {state.administrator && (
                                <Link to="/addProduct" className="account-options">Adicionar produto</Link>
                            )}
                        </div>
                    </div>
                    <span className="border border-red-600 w-full md:w-auto" />
                    <div className="flex flex-col gap-y-8">
                        <h2 className="text-xl md:text-2xl font-bold">Últimos pedidos<span className="text-red-600">:</span></h2>
                        <div className="flex flex-col items-start gap-y-4">
                            <p className="md:text-lg">Não há nenhum pedido feito recentemente</p>
                            <Link className="bg-black rounded-md px-4 py-2 text-sm font-mono text-white hover:scale-105 transition-transform">Ir ao catálogo</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};
