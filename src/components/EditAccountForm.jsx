import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserProvider/context';
import { auth, db } from '../database/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { changeUserPassword } from '../database/auth';

export function EditAccountForm() {
	const labelMap = {
		name: 'Nome',
		lastname: 'Sobrenome',
		phoneNumber: 'Telefone',
		email: 'E-mail',
		currentPassword: 'Senha atual',
		newPassword: 'Nova senha',
		confirmationPassword: 'Confirmar senha',
	};
	const navigate = useNavigate();
	const [userState] = useContext(UserContext);
	const [isVisible, setIsVisible] = useState(false);
	const [passwordData, setPasswordData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmationPassword: '',
	});
	const [newData, setNewData] = useState({
		name: userState.userData.name,
		lastname: userState.userData.lastname,
		phoneNumber: userState.userData.phoneNumber,
		email: auth.currentUser.email,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.values(newData).every((value) => value)) {
			if (isVisible) {
				if (passwordData.newPassword != passwordData.confirmationPassword) {
					toast.error('Senhas não coincidem.');
					return;
				}
				await changeUserPassword(passwordData);
			}
			try {
				const userRef = doc(db, 'users', userState.uid);
				await updateDoc(userRef, newData);
				navigate('/account/edit');
				toast.success('Dados atualizados com sucesso.');
			} catch (e) {
				throw new Error(e.message);
			}
		} else {
			toast.error('Preencha todos os campos para atualizar os dados.');
		}
	};

	const changeVisibility = () => {
		setIsVisible(false);
		const newPasswordData = Object.fromEntries(
			Object.entries(passwordData).map(([key]) => [key, '']),
		);
		setPasswordData(newPasswordData);
	};

	const passwordForm = () => {
		if (isVisible) {
			return (
				<div className="w-full flex flex-col gap-y-5 relative">
					{Object.keys(passwordData).map((key) => (
						<div key={key} className="flex flex-col">
							<label htmlFor={key}>
								{labelMap[key]}
								<span className="text-red-600">:</span>
							</label>
							<input
								type="password"
								name={key}
								value={passwordData[key]}
								className="default-inputs"
								onChange={(e) =>
									setPasswordData((prev) => ({
										...prev,
										[e.target.name]: e.target.value,
									}))
								}
							/>
						</div>
					))}
					<img
						src="/assets/images/close_icon_black.png"
						alt="Fechar formulário"
						className="absolute top-0 right-0 cursor-pointer"
						onClick={changeVisibility}
					/>
				</div>
			);
		}
		return (
			<button
				type="submit"
				className="hover:underline decoration-2 underline-offset-4"
				onClick={() => setIsVisible(true)}
			>
				Editar senha
			</button>
		);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-80 flex flex-col items-start gap-y-5"
		>
			{Object.keys(newData).map((key) => (
				<div key={key} className="w-full flex flex-col">
					<label htmlFor={key}>
						{labelMap[key]}
						<span className="text-red-600">:</span>
					</label>
					<input
						type="text"
						name={key}
						value={newData[key]}
						className="default-inputs"
						onChange={(e) =>
							setNewData((prev) => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
					/>
				</div>
			))}
			{passwordForm()}
			<input
				type="submit"
				value="Salvar dados"
				className="w-40 bg-black rounded-md py-3 text-sm font-bold text-white cursor-pointer"
			/>
		</form>
	);
}
