import { useContext } from "react";
import { CardIllustration } from "./cardIllustration";
import { PaymentContext } from "../contexts/PaymentProvider/context";

export function PaymentMethodsList({ visibilityState }){
    const [, setIsVisible] = visibilityState;
    const [paymentState, ] = useContext(PaymentContext);

    return (
        <div className="flex items-center gap-x-20">
            {paymentState.paymentMethods.map(card => (
                <div key={card.id} className="relative">
                    <CardIllustration paymentData={card} />
                    <span className="flex gap-x-2 absolute top-2 right-2">
                        <img src="/assets/images/edit_white.png" alt="Editar cartão" />
                        <img src="/assets/images/trash_red.png" alt="Excluir cartão" />
                    </span>
                </div>
            ))}
            <img
                src="/assets/images/add.png"
                alt="Adicionar cartão"
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={ () => setIsVisible(true) }
            />
        </div>
    );
};
