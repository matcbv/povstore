import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import { useContext, useState } from "react";
import { AddressContext } from "../contexts/AddressProvider/context";
import { BagResume } from "../components/BagResume";
import { CheckoutCardList } from "../components/CheckoutCardList";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserProvider/context";
import { db } from "../database/firebase";
import { OrderContext } from "../contexts/OrderProvider/context";
import { actionTypes as orderActionTypes } from "../contexts/OrderProvider/actionTypes";
import { actionTypes as checkoutActionTypes } from "../contexts/CheckoutProvider/actionTypes";
import { CheckoutContext } from "../contexts/CheckoutProvider/context";
import { AddressResume } from "../components/AddressResume";

export function Checkout(){
    const [userState, ] = useContext(UserContext);
    const [checkoutState, checkoutDispatch] = useContext(CheckoutContext);
    const [addressState, ] = useContext(AddressContext);
    const [, orderDispatch] = useContext(OrderContext);
    const [currentPayment, setCurrentPayment] = useState(null);
    // const [shipping, setShipping] = useState(null);
    const navigate = useNavigate();

    const finalizeOrder = async () => {
        const ordersRef = collection(db, 'users', userState.uid, 'orders');
        const orderData = {
            items: checkoutState.items,
            finalPrice: checkoutState.finalPrice,
            totalQuantity: checkoutState.totalQuantity,
            status: 'Pedido em preparação',
            paymentMethod: currentPayment,
            deliveryAddress: addressState.defaultAddress,
            orderData: new Date().toISOString(),
        };
        const orderRef = await addDoc(ordersRef, orderData);
        orderDispatch({ type: orderActionTypes.ADD_ORDER, payload: {...orderData, id: orderRef.id} });
        checkoutDispatch({ type: checkoutActionTypes.RESET });
        const checkoutSnaps = await getDocs(collection(db, 'users', userState.uid, 'checkout'));
        checkoutSnaps.docs.map( async item => await deleteDoc(item.ref));
        navigate('/');
        toast.success('Pedido finalizado com sucesso.');
    };

    return (
        <>
            <Header />
            <main className="h-screen flex flex-col gap-y-20 my-20 mx-10 lg:mx-40">
                <section>
                    <div className="w-full flex justify-between font-bold pb-20">
                        <h1 className="text-2xl md:text-3xl underline decoration-red-600 underline-offset-4">Checkout</h1>
                        <span className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/bag')}>
                                <img src="/assets/images/return.png" alt="Voltar" />
                                <p>Voltar</p>
                        </span>
                    </div>
                    <div className="flex justify-center gap-x-20">
                        <div className="flex flex-col items-start gap-y-10">
                            <h2 className="text-xl font-bold">Endereço de entrega:</h2>
                            <AddressResume address={addressState.defaultAddress} />
                            <Link to="/account/edit" className="border-2 rounded-md px-4 py-2 text-sm border-black hover:bg-black hover:text-white transition-colors">Alterar endereço padrão</Link>
                        </div>
                        <div className=" flex flex-col gap-y-10">
                            <h2 className="text-xl font-bold pl-2">Forma de pagamento:</h2>
                            <div className="h-[465px] flex flex-col items-center gap-y-5 p-2 pb-1 overflow-y-scroll custom-scrollbar">
                                <CheckoutCardList currentPaymentState={[currentPayment, setCurrentPayment]} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-10">
                            <BagResume />
                            <button
                                type="button"
                                className="py-3 bg-black rounded-md text-white text-center hover:scale-105 transition-transform"
                                onClick={ finalizeOrder }
                            >
                                Finalizar compra
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};
