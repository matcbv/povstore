import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { getProduct } from '../database/getProduct';

export function ProductPage(){
    const params = useParams();

    return(
        <>
            <Header />
            <main>
                <h1>Teste</h1>
            </main>
            <Footer />
        </>
    );
};
