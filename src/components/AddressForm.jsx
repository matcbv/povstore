import { UserContext } from '../contexts/UserProvider/context';
import { useContext, useState } from 'react';
import { actionTypes } from '../contexts/AddressProvider/actionTypes';
import {
	addDoc,
	collection,
	doc,
	getDocs,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../database/firebase';
import { toast } from 'react-toastify';
import { AddressContext } from '../contexts/AddressProvider/context';

export function AddressForm({ visibilityState, addressData }) {
	const initialData = {
		cep: addressData?.cep || '',
		street: addressData?.street || '',
		number: addressData?.number || '',
		complement: addressData?.complement || '',
		neighborhood: addressData?.neighborhood || '',
		state: addressData?.state || '',
		city: addressData?.city || '',
	};
	const labelMap = {
		cep: 'CEP',
		street: 'Rua',
		number: 'Número',
		complement: 'Complemento',
		neighborhood: 'Bairro',
		state: 'Estado',
		city: 'Cidade',
	};
	const [, setIsVisible] = visibilityState;
	const [userState] = useContext(UserContext);
	const [, addressDispatch] = useContext(AddressContext);
	const [address, setAddress] = useState(initialData);

	const handleChange = (e) =>
		setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			Object.keys(address).every((key) => address[key] || key === 'complement')
		) {
			if (addressData) {
				await updateAddress();
				return;
			}
			try {
				const addressesRef = collection(
					db,
					'users',
					userState.uid,
					'addresses',
				);
				const addressesSnap = await getDocs(addressesRef);
				const completeAddress = {
					...address,
					isDefault: addressesSnap.empty,
					addedAt: new Date().toLocaleString('pt-BR'),
				};
				await addDoc(addressesRef, completeAddress);
				addressDispatch({
					type: actionTypes.ADD_ADDRESS,
					payload: completeAddress,
				});
				addressesSnap.empty &&
					addressDispatch({
						type: actionTypes.SET_DEFAULT_ADDRESS,
						payload: completeAddress,
					});
				setIsVisible(false);
				toast.success('Endereço adicionado com sucesso.');
				return;
			} catch (e) {
				throw new Error(e.message);
			}
		} else {
			toast.error('Preencha todos os campos para adicionar o endereço.');
		}
	};

	const updateAddress = async () => {
		try {
			const addressRef = doc(
				db,
				'users',
				userState.uid,
				'addresses',
				addressData.id,
			);
			await updateDoc(addressRef, address);
			addressDispatch({
				type: actionTypes.UPDATE_ADDRESS,
				payload: { ...address, id: addressData.id },
			});
			addressData.isDefault &&
				addressDispatch({
					type: actionTypes.SET_DEFAULT_ADDRESS,
					payload: { ...address, id: addressData.id },
				});
			setIsVisible(false);
			toast.success('Endereço atualizado com sucesso.');
			return;
		} catch (e) {
			throw new Error(e.message);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-y-10">
				<div className="flex flex-col gap-y-10">
					{Object.keys(address).map((key) => (
						<div key={key} className="flex">
							<label htmlFor={key} className="border-b border-black">
								{labelMap[key]}
							</label>
							<input
								type="text"
								name={key}
								value={address[key]}
								placeholder={key === 'complement' ? 'Opcional' : ''}
								onChange={handleChange}
								className="border-b border-black bg-transparent pl-6 focus:outline-none w-full"
							/>
						</div>
					))}
				</div>
				<input
					type="submit"
					value="Salvar endereço"
					className="w-40 bg-black rounded-md py-3 text-sm font-bold text-white"
				/>
			</form>
			<img
				src="/assets/images/close_icon_black.png"
				alt="Fechar formulário"
				className="absolute top-0 right-0 cursor-pointer"
				onClick={() => {
					setIsVisible(false);
					setAddress(initialData);
				}}
			/>
		</>
	);
}
