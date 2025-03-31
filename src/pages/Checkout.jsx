import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import { CheckoutList } from "../components/CheckoutList";

export function Checkout(){

    return (
        <>
            <Header />
            <main className="flex justify-evenly items-center min-h-screen my-20">
                <CheckoutList />
            </main>
            <Footer />
        </>
    );
};
