import { useContext, useEffect, useState } from "react"
import { PaymentContext } from "../contexts/PaymentProvider/context"
import { CardIllustration } from "./CardIllustration";
import { Link } from "react-router-dom";

export function CheckoutCardList(){
    const [paymentState, ] = useContext(PaymentContext);
    const [currentPaymentId, setCurrentPaymentId] = useState(null);

    useEffect(() => {
        setCurrentPaymentId(paymentState.paymentMethods[0]?.id);
    }, [paymentState])
    
    if(paymentState.paymentMethods.length > 0){
        return (
            paymentState.paymentMethods.map(card => (
                <div key={card.id} className="relative">
                    <div 
                        className={`rounded-lg cursor-pointer ring-red-600 ${card.id === currentPaymentId ? 'ring-2' : 'ring-0'}`}
                        onClick={ () => setCurrentPaymentId(card.id) }
                    >
                        <CardIllustration paymentData={card} />
                        {card.id === currentPaymentId && <img src="/assets/images/selected.png" alt="Selecionado" className="absolute top-2 right-2" />}
                    </div>
                </div>
            ))
        );
    };

    return (
        <div className="flex flex-col items-start gap-y-5">
            <p>Nenhuma forma de pagamento adicionada</p>
            <Link to="/account/payment-methods" className="border-2 rounded-md px-4 py-2 text-sm font-bold border-black hover:bg-black hover:text-white transition-colors">Adicionar forma de pagamento</Link>
        </div>
    );
};
