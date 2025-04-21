import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../layouts/Header";
import { Footer } from "../layouts/Footer";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../contexts/OrderProvider/context";
import { CardIllustration } from "../components/CardIllustration";
import { AddressResume } from "../components/AddressResume";

export function OrdersDetails(){
    const navigate = useNavigate();
    const params = useParams();
    const [orderState, ] = useContext(OrderContext);
    const [currentOrder, setCurrentOrder] = useState(null);

    useEffect(() => {
        setCurrentOrder(orderState.orders.find(order => order.id === params.orderId ));
    }, [orderState, params.orderId]);

    return (
        <>
            <Header />
            <main className="flex min-h-screen">
                <section className="w-full flex flex-col items-center m-20 text-black">
                    <div className="w-full flex justify-between items-center pb-20">
                        <h1 className="text-2xl lg:text-3xl font-bold">Pedido <span className="underline decoration-red-600 underline-offset-4">{params.orderId.slice(-6)}</span></h1>
                        <span className="flex flex-col items-center cursor-pointer font-bold" onClick={() => navigate('/account')}>
                            <img src="/assets/images/return.png" alt="Voltar" className="w-6 lg:w-8" />
                            <p className="text-sm lg:text-base">Voltar</p>
                        </span>
                    </div>
                    <div className="flex gap-x-40">
                        <div className="flex flex-col gap-y-10">
                            {currentOrder?.items.map(item => (
                                <div key={item.id} className="flex gap-x-10 items-center">
                                    <img src={item.imageURL} alt={item.name} className="w-40" />
                                    <div className="flex flex-col gap-y-3 font-bold">
                                        <p className="underline underline-offset-4 decoration-red-600">{item.name}</p>
                                        <p>Quantidade: {item.quantity}</p>
                                        <p>Preço: {item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {
                            <div key={currentOrder?.id} className="flex flex-col gap-y-10">
                                <div className="flex flex-col gap-y-5 font-bold">
                                    <h2 className="underline underline-offset-4 decoration-2 decoration-red-600 text-xl">Resumo da compra</h2>
                                    <div className="flex flex-col gap-y-2">
                                        <p>Data da compra: {currentOrder?.orderData.slice(0, 10)}</p>
                                        <div>Número de itens: {currentOrder?.totalQuantity}</div>
                                        <p>Preço final: R$ {currentOrder?.finalPrice.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-y-5">
                                    <h2 className="text-xl font-bold">Endereço de entrega:</h2>
                                    <AddressResume address={currentOrder?.deliveryAddress} />
                                </div>
                                <div className="flex flex-col gap-y-5">
                                    <h2 className="text-xl font-bold">Método de compra:</h2>
                                    <CardIllustration paymentData={currentOrder?.paymentMethod} />
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};
