import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../layouts/Footer";
import { Header } from "../layouts/Header";
import { getProducts } from "../database/getProducts";
import { useEffect, useState } from "react";
import { CatalogFilter } from "../components/CatalogFilter";
import { ProductsMap } from "../components/ProductsMap";

export function ProductsCatalog(){
    const params = useParams();
    const navigate = useNavigate();
    
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(false);

    const genderMap = {
        men: 'Masculino',
        women: 'Feminino',
        children: 'Infantil',
    };

    useEffect(() => {
        setLoading(true)
        async function callGetProducts(){
            const products = await getProducts(params.gender);
            setProducts(products);
            setLoading(false);
        };
        callGetProducts();
    }, [params.gender]);

    return (
        <>
            <Header />
            <main className="flex min-h-screen">
                <CatalogFilter gender={ params.gender } category={ params.category } />
                <section className="w-full flex flex-col m-20 text-black">
                    <div className="w-full flex justify-between pb-20">
                        <h1 className="text-2xl md:text-3xl font-bold">Catálogo <span className="underline decoration-red-600 underline-offset-4">{genderMap[params.gender]}</span></h1>
                        <span className="flex flex-col items-center cursor-pointer font-bold" onClick={() => navigate(-1)}>
                                <img src="/assets/images/return.png" alt="Voltar" />
                                <p>Voltar</p>
                        </span>
                    </div>
                    <ProductsMap products={products} loading={loading} />
                </section>
            </main>
            <Footer />
        </>
    );
};
