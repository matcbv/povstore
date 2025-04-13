import { useContext } from "react";
import { Footer } from "../layouts/Footer";
import { Header } from "../layouts/Header";
import { UserContext } from "../contexts/UserProvider/context";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../database/auth";
import { AddressContext } from "../contexts/AddressProvider/context";
import { CheckoutContext } from "../contexts/CheckoutProvider/context";

export function Account(){
    const navigate = useNavigate();
    const [userState, userDispatch] = useContext(UserContext);
    const [, checkoutDispatch] = useContext(CheckoutContext);
    const [addressState, ] = useContext(AddressContext);

    const handleClick = () => {
        try{
            logout(userDispatch, checkoutDispatch);
            navigate('/');
        }catch(e){
            throw new Error(e.message);
        };
    };

    const addressExists = () => {
        if(Object.keys(addressState.defaultAddress).length > 0){
            return (
                <div className="flex flex-col items-start gap-y-2">
                    <p>CEP: {addressState.defaultAddress.cep}</p>
                    <p>{addressState.defaultAddress.street}, {addressState.defaultAddress.number} - {addressState.defaultAddress.neighborhood}</p>
                    <p>{addressState.defaultAddress.city} - {addressState.defaultAddress.state}</p>
                    <p>{addressState.defaultAddress.complement}</p>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col items-start gap-y-4">
                    <p className="md:text-lg">Nenhum endereço definido como principal<span className="text-red-600">.</span></p>
                    <Link to="/account/edit" className="bg-black rounded-md px-4 py-3 text-sm font-bold text-white hover:scale-105 transition-transform">Adicionar endereço</Link>
                </div>
            );
        };
    };

    if(userState.loading){
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center gap-y-10">
                <img className="w-40" src="/assets/images/loading.gif" alt="Caregando" />
                <p className="font-bold text-2xl">Carregando dados<span className="text-red-600">...</span></p>
            </div>
        );
    };

    return (
        <>
            <Header />
            <main className="flex flex-col gap-y-20 min-h-screen my-20">
                <div className="flex justify-between items-center px-8 md:px-40">
                    <h1 className="text-2xl md:text-4xl font-bold">Conta de <span className="underline decoration-red-600 underline-offset-4">{userState.userData.name}</span></h1>
                    <span className="flex flex-col items-center cursor-pointer font-bold" onClick={ handleClick }>
                        <img src="/assets/images/sign_out.png" alt="Sair" />
                        Sair
                    </span>
                </div>
                <section className="flex flex-col md:flex-row items-center md:items-stretch gap-y-20 md:gap-y-0 justify-center md:gap-x-10 lg:gap-x-20 text-black">
                    <div className="flex flex-col gap-y-14">
                        <div className="flex flex-col gap-y-5">
                            <h2 className="text-lg md:text-xl font-bold">Endereço principal<span className="text-red-600">:</span></h2>
                            {addressExists()}
                        </div>
                        <div className="flex flex-col gap-y-4 md:gap-y-6">
                            <Link to="edit" className="account-options">Editar conta</Link>
                            <Link className="account-options">Métodos de pagamento</Link>
                            <Link to="favorites" className="account-options">Favoritos</Link>
                            <Link className="account-options">Meus pedidos</Link>
                            {userState.userData.administrator && (
                                <Link to="add-product" className="account-options">Adicionar produto</Link>
                            )}
                        </div>
                    </div>
                    <span className="border border-red-600 w-full md:w-auto" />
                    <div className="flex flex-col gap-y-8">
                        <h2 className="text-xl md:text-3xl font-bold">Últimos pedidos<span className="text-red-600">:</span></h2>
                        <div className="flex flex-col items-start gap-y-4">
                            <p className="md:text-lg">Não há pedidos feitos recentemente.</p>
                            <Link to="/catalog" className="bg-black rounded-md px-8 py-3 text-sm font-bold text-white hover:scale-105 transition-transform">Ir ao catálogo</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};
