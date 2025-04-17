import { useContext } from "react";
import { CardIllustration } from "./CardIllustration";
import { PaymentContext } from "../contexts/PaymentProvider/context";
import { deleteDoc, doc } from "firebase/firestore";
import { UserContext } from "../contexts/UserProvider/context";
import { db } from "../database/firebase";
import { actionTypes } from "../contexts/PaymentProvider/actionTypes";
import { toast } from "react-toastify";

export function PaymentMethodsList({ setIsVisible, setCurrentData }){
    const [userState, ] = useContext(UserContext);
    const [paymentState, paymentDispatch] = useContext(PaymentContext);
    
    const deletePayment = async (card) => {
        try{
            const paymentMethodRef = doc(db, 'users', userState.uid, 'paymentMethods', card.id);
            await deleteDoc(paymentMethodRef);
            paymentDispatch({ type: actionTypes.DELETE_PAYMENT_METHOD, payload: card });
            toast.success('Método de pagamento excluído com sucesso.');
            return;
        } catch(e){
            throw new Error(e);
        };
    };
    
    if(paymentState.loading){
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-y-10">
                <img className="w-60" src="/assets/images/loading.gif" alt="Caregando" />
                <p className="font-bold text-2xl">Carregando métodos de pagamento<span className="text-red-600">...</span></p>
            </div>
        );
    };

    return (
        <div className="flex items-center gap-x-20">
            {paymentState.paymentMethods.map(card => (
                <div key={card.id} className="relative">
                    <CardIllustration paymentData={card} />
                    <span className="flex gap-x-2 absolute top-2 right-2">
                        <img
                            src="/assets/images/edit_white.png"
                            alt="Editar cartão"
                            className="cursor-pointer"
                            onClick={ () => {
                                setIsVisible(true);
                                setCurrentData(card);
                            } }
                        />
                        <img
                            src="/assets/images/trash_red.png"
                            alt="Excluir cartão"
                            className="cursor-pointer"
                            onClick={ () => deletePayment(card) }
                        />
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
