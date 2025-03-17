import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../layouts/Footer";
import { Header } from "../layouts/Header";
import { getProducts } from "../database/getProducts";
import { useEffect, useState } from "react";
import { CatalogFilter } from "../components/CatalogFilter";

export function ProductsCatalog(){
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState(null);
    const categoryMap = {
        man: 'Masculino',
        woman: 'Feminino',
        child: 'Infantil',
    };

    useEffect(() => {
        async function callGetProducts(){
            const products = await getProducts(params.gender);
            setProducts(products);
        };
        callGetProducts();
    }, [params.gender]);

    return (
        <>
            <Header />
            <main className="flex">
                <CatalogFilter gender={ params.gender } category={ params.category } />
                <section className="w-full flex flex-col m-20 text-black">
                    <div className="w-full flex justify-between px-10 lg:px-40 py-20">
                        <h1 className="text-2xl md:text-4xl font-bold">Catálogo <span className="underline decoration-red-600 underline-offset-4">{categoryMap[params.gender]}</span></h1>
                        <span className="flex flex-col items-center cursor-pointer font-bold" onClick={() => navigate(-1)}>
                                <img src="/assets/images/return.png" alt="Voltar" />
                                <p>Voltar</p>
                        </span>
                    </div>
                    <div className="grid grid-cols-4 items-end gap-y-20 gap-x-10">
                        {products?.map((prod) => (
                            <div
                                key={prod.id}
                                className="max-w-80 h-full flex flex-col items-center justify-center gap-y-10 relative font-bold transition-transform hover:scale-105 cursor-pointer group"
                            >
                                <img src={prod.imageURL} alt={prod.name} className="w-40 max-h-80" />
                                <div className="flex flex-col items-center gap-y-1">
                                    <p className="pl-2 border-l-2 border-red-600">{prod.name}</p>
                                    <p>R$ {prod.price}</p>
                                    <p className="text-sm text-neutral-400">6x de {(Number.parseFloat(prod.price)/6).toFixed(2)}</p>
                                </div>
                                <img src="/assets/images/heart.png" alt="Favoritar" className="hidden absolute top-0 right-0 transition-transform group-hover:block hover:scale-110" />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};
