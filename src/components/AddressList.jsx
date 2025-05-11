import { useContext, useState } from 'react';
import { AddressContext } from '../contexts/AddressProvider/context';
import { AddressForm } from './AddressForm';
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../database/firebase';
import { UserContext } from '../contexts/UserProvider/context';
import { toast } from 'react-toastify';
import { actionTypes } from '../contexts/AddressProvider/actionTypes';

export function AddressList() {
	const [userState] = useContext(UserContext);
	const [addressState, addressDispatch] = useContext(AddressContext);
	const [isVisible, setIsVisible] = useState(false);
	const [currentAddress, setCurrentAddress] = useState(null);

	const deleteAddress = async (address) => {
		try {
			const addressRef = doc(
				db,
				'users',
				userState.uid,
				'addresses',
				address.id,
			);
			await deleteDoc(addressRef);
			addressDispatch({ type: actionTypes.DELETE_ADDRESS, payload: address });
			address.isDefault &&
				addressDispatch({ type: actionTypes.SET_DEFAULT_ADDRESS, payload: {} });
			toast.success('Endereço excluído com sucesso.');
		} catch (e) {
			throw new Error(e.message);
		}
	};

	const setDefault = async (address) => {
		try {
			// Obtendo a referência da coleção através do método collection:
			const addressesRef = collection(db, 'users', userState.uid, 'addresses');
			/*
                Com o método query, é possível realizarmos uma busca pelos documentos de uma coleção através de:

                - A referência da coleção desejada.
                - O método where, responsável por filtrar os documentos através de determinado campo.

                Obs.: Podemos utilizar mais de um where de forma encadeada.
            */
			const q = query(addressesRef, where('isDefault', '==', true));
			/*
                Obtendo todos os documentos que correspondem a query criada com o método getDocs:

                Como resultado, receberemos uma QuerySnapshot, diferentemente de getDoc, que nos retorna um DocumentSnapshot.
                Obs.: Para obtermos os documentos em forma de array do Snapshot recebido, utilizaremos a propriedade docs.
            */
			const defaultAddress = (await getDocs(q)).docs[0]; // Obtendo nosso endereço padrão como índice 0, já que só há ele em nosso array.
			// Atualizando o documento através de sua areferência, retornada com a propriedade ref do documento obtido:
			await updateDoc(defaultAddress.ref, { isDefault: false });
			const addressRef = doc(
				db,
				'users',
				userState.uid,
				'addresses',
				address.id,
			);
			await updateDoc(addressRef, { isDefault: true });
			addressDispatch({
				type: actionTypes.SET_DEFAULT_ADDRESS,
				payload: { ...address, isDefault: true },
			});
			toast.success('Endereço principal alterado com sucesso.');
		} catch (e) {
			throw new Error(e.message);
		}
	};

	return (
		<>
			{isVisible ? (
				<AddressForm
					visibilityState={[isVisible, setIsVisible]}
					addressData={currentAddress}
				/>
			) : (
				<>
					<div className="flex flex-col items-start gap-y-10">
						{addressState.addresses.length > 0 ? (
							addressState.addresses.map((address) => (
								<div
									key={address.id}
									className="flex flex-col items-start gap-y-2 border-l-2 border-l-red-600 pl-3 font-normal  relative"
								>
									<p>CEP: {address.cep}</p>
									<p>
										{address.street}, {address.number} - {address.neighborhood}
									</p>
									<p>
										{address.city} - {address.state}
									</p>
									<p>{address.complement}</p>
									<img
										src="/assets/images/edit_black.png"
										alt="Editar endereço"
										className="absolute right-7 w-5 cursor-pointer"
										onClick={() => {
											setCurrentAddress(address);
											setIsVisible(true);
										}}
									/>
									<img
										src="/assets/images/trash_red.png"
										alt="Excluir endereço"
										className="absolute right-0 cursor-pointer"
										onClick={() => deleteAddress(address)}
									/>
									<div className="flex gap-x-2">
										<p className="font-bold">Endereço principal:</p>
										<input
											type="radio"
											name="default"
											checked={address.isDefault}
											onChange={() => setDefault(address)}
										/>
									</div>
								</div>
							))
						) : (
							<p>Nenhum endereço adicionado.</p>
						)}
					</div>
					<button
						type="button"
						className="w-40 bg-black rounded-md py-3 text-sm font-bold text-white"
						onClick={() => {
							setIsVisible(true);
							setCurrentAddress(null);
						}}
					>
						Adicionar endereço
					</button>
				</>
			)}
		</>
	);
}
