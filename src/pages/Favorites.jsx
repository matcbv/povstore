import { useNavigate } from "react-router-dom"
import { Footer } from "../layouts/Footer"
import { Header } from "../layouts/Header"
import { FavoritesMap } from "../components/FavoritesMap";

export function Favorites(){
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <main className="flex min-h-screen">
                <section className="w-full flex flex-col m-20 text-black">
                    <div className="w-full flex justify-between pb-20">
                        <h1 className="text-2xl md:text-3xl font-bold">Seus <span className="underline decoration-red-600 underline-offset-4">favoritos</span></h1>
                        <span className="flex flex-col items-center cursor-pointer font-bold" onClick={() => navigate(-1)}>
                                <img src="/assets/images/return.png" alt="Voltar" />
                                <p>Voltar</p>
                        </span>
                    </div>
                    <FavoritesMap />
                </section>
            </main>
            <Footer />
        </>
    );
};
