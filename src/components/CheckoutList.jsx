import { useContext } from "react";
import { CheckoutContext } from "../contexts/CheckoutProvider/context";
import { Link } from "react-router-dom";
import { db } from "../database/firebase";
import { UserContext } from "../contexts/UserProvider/context";
import { collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { actionTypes } from "../contexts/CheckoutProvider/actionTypes";
import { updateCheckout } from "../utils/updateCheckout";
import { CheckoutResume } from "./CheckoutResume";

export function CheckoutList() {
    const [userState, ] = useContext(UserContext); 
    const [checkoutState, checkoutDispatch] = useContext(CheckoutContext);   

    const setQuantity = async (productId, increase) => {
        const checkoutRef = collection(db, 'users', userState.uid, 'checkout');
        const q = query(checkoutRef, where('productId', '==', productId));
        const itemSnap = (await getDocs(q)).docs[0];
        const itemData = itemSnap.data();
        const itemRef = itemSnap.ref;
        if(increase){
            await updateDoc(itemRef, {...itemData, quantity: itemData.quantity + 1});
        } else{
            itemData.quantity <= 1 ? deleteDoc(itemRef) : await updateDoc(itemRef, {...itemData, quantity: itemData.quantity - 1});
        };
        updateCheckout(userState.uid, checkoutDispatch);
    };

    const removeItems = async () => {
        const checkoutRef = collection(db, 'users', userState.uid, 'checkout');
        const itemsSnap = await getDocs(checkoutRef);
        itemsSnap.docs.forEach(item => {
            deleteDoc(item.ref);
        });
        checkoutDispatch({ type: actionTypes.REMOVE_ITEMS });
        checkoutDispatch({ type: actionTypes.SET_TOTAL_QUANTITY, payload: 0 });
    };

    if(Object.keys(checkoutState.items).length <= 0){
        return (
            <section className="flex flex-col items-start gap-y-5">
                <p className="text-lg">Ops... Ainda não há itens em sua sacola</p>
                <Link to='/catalog' className="bg-black text-white p-3 px-6 rounded transition-transform hover:scale-105">Continuar comprando</Link>
            </section>
        );
    };
    
    return (
        <section className="flex justify-around items-start">
            <div className="flex flex-col gap-y-20">
                {checkoutState.items.map(item => (
                    <div className="flex gap-x-10" key={item.name}>
                        <img src={item.imageURL} alt={item.name} className="w-40 max-h-60 object-contain" />
                        <div className="flex flex-col items-start gap-y-5">
                            <h2 className="underline underline-offset-4 decoration-2 decoration-red-600 text-lg">{item.name}</h2>
                            <p>R$ {item.price}</p>
                            <p>Tamanho: {item.size}</p>
                            <div className='flex flex-col items-center gap-y-2'>
                                <p>Quantidade:</p>
                                <span className='flex gap-x-4'>
                                    <img
                                        src="/assets/images/decrease.png"
                                        alt="Diminuir"
                                        className='cursor-pointer'
                                        onClick={ () => setQuantity(item.productId, false) }
                                    />
                                    <span>{item.quantity}</span>
                                    <img
                                        src="/assets/images/increase.png"
                                        alt="Aumentar"
                                        className='cursor-pointer'
                                        onClick={ () => setQuantity(item.productId, true) }
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    className="border-2 rounded-md py-2 text-sm md:text-base border-black hover:border-red-600"
                    onClick={ removeItems }
                >
                    Limpar sacola
                </button>
            </div>
            <CheckoutResume />
        </section>   
    );
};
