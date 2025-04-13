import { useContext, useState } from "react"
import { AddressContext } from "../contexts/AddressProvider/context";
import { AddressForm } from "./AddressForm";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../database/firebase";
import { UserContext } from "../contexts/UserProvider/context";
import { toast } from "react-toastify";
import { actionTypes } from "../contexts/AddressProvider/actionTypes";

export function AddressList(){
    const [userState, ] = useContext(UserContext);
    const [addressState, addressDispatch] = useContext(AddressContext);
    const [isVisible, setIsVisible] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);

    const deleteAddress = async (address) => {
        try{
            const addressRef = doc(db, 'users', userState.uid, 'addresses', address.id);
            await deleteDoc(addressRef);
            addressDispatch({ type: actionTypes.DELETE_ADDRESS, payload: address });
            address.isDefault && addressDispatch({ type: actionTypes.SET_DEFAULT_ADDRESS, payload: {} });
            toast.success('Endereço excluído com sucesso.');
        } catch(e){
            throw new Error(e.message);
        };
    };

    return (
        <>
            {isVisible ? <AddressForm visibilityState={[isVisible, setIsVisible]} addressData={currentAddress} /> : (
                <div className="flex flex-col items-start gap-y-10">
                    <div className="flex flex-col gap-y-10">
                        {addressState.addresses.length > 0 ? addressState.addresses.map(address => (
                            <div key={address.id} className="flex flex-col items-start gap-y-2 border-l-2 border-l-red-600 pl-3 font-normal  relative">
                                <p>CEP: {address.cep}</p>
                                <p>{address.street}, {address.number} - {address.neighborhood}</p>
                                <p>{address.city} - {address.state}</p>
                                <p>{address.complement}</p>
                                <img
                                    src="/assets/images/edit.png"
                                    alt="Editar endereço"
                                    className="absolute right-7 w-5 cursor-pointer"
                                    onClick={ () => {
                                        setCurrentAddress(address);
                                        setIsVisible(true);
                                    }}
                                />
                                <img
                                    src="/assets/images/trash_red.png"
                                    alt="Excluir endereço"
                                    className="absolute right-0 cursor-pointer"
                                    onClick={ () => deleteAddress(address) }
                                />

                            </div>
                        )): (
                            <div className="flex flex-col items-start gap-y-5">
                                <p>Nenhum endereço definido.</p>
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        className="w-40 bg-black rounded-md py-3 text-sm font-bold text-white"
                        onClick={ () => {
                            setIsVisible(true);
                            setCurrentAddress(null);
                        }}
                    >
                        Adicionar endereço
                    </button>
                </div>
            )}
        </>
    );
};
