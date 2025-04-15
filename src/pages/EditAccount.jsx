import { useNavigate } from "react-router-dom";
import { Footer } from "../layouts/Footer";
import { Header } from "../layouts/Header";
import { EditAccountForm } from "../components/EditAccountForm";
import { AddressList } from "../components/AddressList";
import { useContext } from "react";
import { UserContext } from "../contexts/UserProvider/context";

export function EditAccount(){
    const [userState, ] = useContext(UserContext);
    const navigate = useNavigate();

    if(!userState.userData){
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center gap-y-10">
                <img className="w-60" src="/assets/images/loading.gif" alt="Caregando" />
                <p className="font-bold text-2xl">Carregando dados<span className="text-red-600">...</span></p>
            </div>
        );
    };

    return (
        <>
            <Header />
            <main className="flex min-h-screen">
                <section className="w-full flex flex-col m-20 text-black font-bold">
                    <div className="w-full flex justify-between pb-20">
                        <h1 className="text-2xl md:text-3xl underline decoration-red-600 underline-offset-4">Editar conta</h1>
                        <span className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/account')}>
                                <img src="/assets/images/return.png" alt="Voltar" />
                                <p>Voltar</p>
                        </span>
                    </div>
                    <div className="flex justify-center gap-x-40">
                        <div className="flex flex-col gap-y-10 relative">
                            <h2 className="text-xl underline decoration-red-600 underline-offset-4">Seus endereços</h2>
                            <AddressList />
                        </div>
                        <div className="flex flex-col gap-y-10">
                            <h2 className="text-xl underline decoration-red-600 underline-offset-4">Seus dados</h2>
                            <EditAccountForm />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}