import { useContext } from "react";
import { CheckoutContext } from "../contexts/CheckoutProvider/context";
import { Link } from "react-router-dom";
import { db } from "../database/firebase";
import { UserContext } from "../contexts/UserProvider/context";
import { collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { actionTypes } from "../contexts/CheckoutProvider/actionTypes";

export function CheckoutList() {
    const [userState, ] = useContext(UserContext); 
    const [checkoutState, checkoutDispatch] = useContext(CheckoutContext);

    const setQuantity = async (productId, increase) => {
        const checkoutRef = collection(db, 'users', userState.uid, 'checkout');
        const q = query(checkoutRef, where('productId', '==', productId));
        const itemSnap = await getDocs(q);
        const itemData = itemSnap.docs[0].data();
        const itemRef = itemSnap.docs[0].ref;
        if(increase){
            await updateDoc(itemRef, {...itemData, quantity: itemData.quantity + 1});
        } else{
            itemData.quantity <= 1 ? deleteDoc(itemRef) : await updateDoc(itemRef, {...itemData, quantity: itemData.quantity - 1});
        };

        const updatedItemsSnap = (await getDocs(checkoutRef)).docs;
        const updatedItemsData = updatedItemsSnap.map(snap => snap.data());
        checkoutDispatch({ type: actionTypes.ADD_ITEMS, payload: updatedItemsData });
    };

    const removeItems = () => {
        checkoutDispatch({ type: actionTypes.REMOVE_ITEMS });
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
            <div className="flex flex-col gap-y-10 w-[350px] px-5 py-10 rounded border-2 border-black">
                <h2 className="text-xl">Resumo da compra</h2>
                <div className="flex flex-col gap-y-10">
                    <ul className="flex flex-col gap-y-5">
                        <li>Número de itens: <span className="text-red-600">0</span></li>
                        <li>Valor total: <span className="text-red-600">R$ 00,00</span></li>
                        <li>Descontos:</li>
                    </ul>
                    <div>
                        <p className="text-xl">Valor final: <span className="text-red-600">R$ 00.00</span></p>
                    </div>
                </div>
            </div>
        </section>   
    );
};
