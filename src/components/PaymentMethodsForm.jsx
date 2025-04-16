import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../database/firebase";
import { UserContext } from "../contexts/UserProvider/context";
import { addDoc, collection } from "firebase/firestore";

export function PaymentMethodsForm({ visibilityState }){
    const [userState, ] = useContext(UserContext);
    const [, setIsVisible] = visibilityState;

    const labelMap = {
        cardholderName: 'Nome do titular',
        cardNumber: 'Número do cartão',
        validThru: 'Valido até',
        cvc: 'CVC',
    };
    const [paymentData, setPaymentData] = useState({
        cardholderName: '',
        cardNumber: '',
        validThru: '',
        cvc: '',
    });

    const handleChange = (e) => {
        // if(e.target.name === 'cardNumber'){
        //     return;
        // } else if(e.target.name === 'cvc'){
        //     return;
        // };
        setPaymentData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(Object.values(paymentData).every(value => value)){
            try{
                const paymentMethodsRef = collection(db, 'users', userState.uid, 'paymentMethods');
                await addDoc(paymentMethodsRef, paymentData);
                setIsVisible(false);
                toast.success('Método de pagamento adicionado com sucesso.');
                return;
            } catch(e){
                throw new Error(e.message);
            }
        } else{
            toast.error('Preencha todos os campos para adicionar o método de pagamento.')
        };
    };

    return(
        <div className="flex items-center gap-x-20">
            <form onSubmit={ handleSubmit } className="flex flex-col gap-y-10">
                {Object.keys(paymentData).map(key => (
                    <div key={key} className="flex">
                        <label htmlFor={key} className="min-w-fit border-b-2 border-black">{labelMap[key]}</label>
                        <input type="text" name={key} value={paymentData[key]} onChange={ handleChange } className="border-b-2 border-black bg-transparent pl-6 focus:outline-none w-full" />
                    </div>
                ))}
                <div className="flex gap-x-5">
                    <button type="submit" className="w-40 bg-black rounded-md py-3 text-sm font-bold text-white">Salvar cartão</button>
                    <button type="button" className="w-40 rounded-md py-3 text-sm font-bold border-2 border-black text-black" onClick={ () => setIsVisible(false) }>Cancelar</button>
                </div>
            </form>
            <div className="w-[400px] h-[250px] flex flex-col justify-between items-start p-5 rounded-lg bg-black text-white">
                <img src="/assets/images/card_flag.png" alt="Bandeira do cartão" />
                <div className="flex flex-col gap-y-4">
                    <p>{paymentData.cardholderName ? paymentData.cardholderName : 'Nome do titular'}</p>
                    <p className="text-lg">{paymentData.cardNumber ? paymentData.cardNumber : '**** **** **** ****'}</p>
                    <div className="flex gap-x-10">
                        <span className="flex flex-col">
                            <p className="text-[0.6rem]">VALID THRU</p>
                            <p>{paymentData.validThru ? paymentData.validThru : '**/**'}</p>
                        </span>
                        <span className="flex flex-col">
                            <p className="text-[0.6rem]">CVC</p>
                            <p>{paymentData.cvc ? paymentData.cvc : '***'}</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
