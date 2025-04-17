import { useContext } from "react"
import { PaymentContext } from "../contexts/PaymentProvider/context"
import { CardIllustration } from "./CardIllustration";
import { Link } from "react-router-dom";

export function CheckoutCardList(){
    const [paymentState, ] = useContext(PaymentContext);
    
    if(paymentState.paymentMethods.length > 0){
        return (
            paymentState.paymentMethods.map(card => (
                <div key={card.id}>
                    <CardIllustration paymentData={card} />
                </div>
            ))
        );
    };

    return (
        <>
            <p>Nenhuma forma de pagamento adicionada</p>
            <Link to="/account/payment-methods" className="border-2 rounded-md px-4 py-2 text-sm font-bold border-black hover:bg-black hover:text-white transition-colors">Adicionar forma de pagamento</Link>
        </>
    );
};
