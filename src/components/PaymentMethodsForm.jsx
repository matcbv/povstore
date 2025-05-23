import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../database/firebase';
import { UserContext } from '../contexts/UserProvider/context';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { actionTypes } from '../contexts/PaymentProvider/actionTypes';
import { CardIllustration } from './CardIllustration';
import { PaymentContext } from '../contexts/PaymentProvider/context';

export function PaymentMethodsForm({ setIsVisible, currentState }) {
	const [currentData, setCurrentData] = currentState;
	const [userState] = useContext(UserContext);
	const [, paymentDispatch] = useContext(PaymentContext);
	const labelMap = {
		cardholderName: 'Nome do titular',
		cardNumber: 'Número do cartão',
		validThru: 'Valido até',
		cvc: 'CVC',
	};
	const [paymentData, setPaymentData] = useState({
		cardholderName: currentData?.cardholderName || '',
		cardNumber: currentData?.cardNumber || '',
		validThru: currentData?.validThru || '',
		cvc: currentData?.cvc || '',
	});

	const handleChange = (e) => {
		const raw = e.target.value.replace(/\s|\//g, '');

		switch (e.target.name) {
			case 'cardNumber': {
				if (raw.length <= 16 && !raw.match(/\D/g)) {
					// Validando se o valor do campo é menor ou igual a 16 caracteres e se é um dígito (0 a 9).
					const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 '); // Inserindo um espaço nos grupos de 4 dígitos obtidos.
					// Obs.: Com o símbolo $ ($1 [primeiro grupo], $2 [segundo grupo], etc...), conseguimos fazer referência aos grupos de nossa regex.
					setPaymentData((prev) => ({
						...prev,
						[e.target.name]: formatted,
					}));
				}
				break;
			}
			case 'cvc': {
				if (!raw.match(/\D/g) && raw.length <= 3) {
					setPaymentData((prev) => ({
						...prev,
						[e.target.name]: e.target.value,
					}));
				}
				break;
			}
			case 'validThru': {
				if (!raw.match(/\D/g) && raw.length <= 4) {
					const formatted = raw.replace(/(\d{2})(?=\d)/g, '$1/');
					setPaymentData((prev) => ({
						...prev,
						[e.target.name]: formatted,
					}));
				}
				break;
			}
			case 'cardholderName': {
				if (!raw.match(/\d/g)) {
					setPaymentData((prev) => ({
						...prev,
						[e.target.name]: e.target.value,
					}));
				}
				break;
			}
			default: {
				setPaymentData((prev) => ({
					...prev,
					[e.target.name]: e.target.value,
				}));
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.values(paymentData).every((value) => value)) {
			if (currentData) {
				await updatePaymentMethod();
				return;
			}
			try {
				const paymentMethodsRef = collection(
					db,
					'users',
					userState.uid,
					'paymentMethods',
				);
				const completeData = {
					...paymentData,
					addedAt: new Date().toLocaleString('pt-BR'),
				};
				await addDoc(paymentMethodsRef, completeData);
				paymentDispatch({
					type: actionTypes.ADD_PAYMENT_METHOD,
					payload: completeData,
				});
				setIsVisible(false);
				toast.success('Método de pagamento adicionado com sucesso.');
				return;
			} catch (e) {
				throw new Error(e.message);
			}
		} else {
			toast.error(
				'Preencha todos os campos para adicionar o método de pagamento.',
			);
		}
	};

	const updatePaymentMethod = async () => {
		try {
			const paymentMethodRef = doc(
				db,
				'users',
				userState.uid,
				'paymentMethods',
				currentData.id,
			);
			await updateDoc(paymentMethodRef, paymentData);
			paymentDispatch({
				type: actionTypes.UPDATE_PAYMENT_METHOD,
				payload: { ...paymentData, id: currentData.id },
			});
			setIsVisible(false);
			toast.success('Método de pagamento atualizado com sucesso.');
			return;
		} catch (e) {
			throw new Error(e.message);
		}
	};

	return (
		<div className="flex gap-x-20">
			<form onSubmit={handleSubmit} className="flex flex-col gap-y-10">
				{Object.keys(paymentData).map((key) => (
					<div key={key} className="flex">
						<label htmlFor={key} className="min-w-fit border-b border-black">
							{labelMap[key]}
						</label>
						<input
							type="text"
							name={key}
							value={paymentData[key]}
							onChange={handleChange}
							className="border-b border-black bg-transparent pl-6 focus:outline-none w-full"
						/>
					</div>
				))}
				<div className="flex gap-x-5">
					<button
						type="submit"
						className="w-40 bg-black rounded-md py-3 text-sm font-bold text-white"
					>
						Salvar cartão
					</button>
					<button
						type="button"
						className="w-40 rounded-md py-3 text-sm font-bold border-2 border-black text-black"
						onClick={() => {
							setIsVisible(false);
							setCurrentData(null);
						}}
					>
						Cancelar
					</button>
				</div>
			</form>
			<CardIllustration paymentData={paymentData} />
		</div>
	);
}
