import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserProvider/context"

export function AddressList(){
    const [userState, ] = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(false);

    const addAddress = () => {
        console.log('teste');
    }

    if(!userState.userData.address){
        return (
            <>
                <div className="flex flex-col items-start gap-y-2">
                    <p>Nenhum endereço cadastrado.</p>
                    <button
                        type="button"
                        className="bg-black rounded-md px-4 py-3 text-sm font-bold text-white hover:scale-105 transition-transform"
                        onClick={ () => setIsOpen(true) }
                    >
                        Adicionar endereço
                    </button>
                </div>
                {isOpen && (
                    <div>
                        <form onSubmit={ addAddress }>
                            <label htmlFor="street">Rua:</label>
                            <input type="text" name="street" id="street" />
                        </form>    
                    </div>
                )}
            </>
        );
    };

    return (
        <>

        </>
    )

};
