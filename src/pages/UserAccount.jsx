import { useContext } from "react";
import { Footer } from "../layouts/Footer";
import { Header } from "../layouts/Header";
import { UserContext } from "../contexts/UserProvider/context";
import { Link } from "react-router-dom";

export function UserAccount(){
    const [state, ] = useContext(UserContext);
    return (
        <>
            <Header />
            <main className="flex flex-col h-screen">
                <section>
                    <Link to="/editAccount">Editar dados</Link>
                    {state.administrator && (
                        <Link to="/addProduct">Adicionar produto</Link>
                    )}
                </section>
                <section>
                    <h2>Últimos pedidos</h2>
                </section>
            </main>
            <Footer />
        </>
    );
};
