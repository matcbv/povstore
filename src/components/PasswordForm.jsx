import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../database/firebase';

export function PasswordForm({ setShowPasswordForm }) {
	const [email, setEmail] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await sendPasswordResetEmail(auth, email);
	};

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-y-10 w-[310px]">
			<div className="flex flex-col gap-y-5">
				<div className="flex">
					<label className="border-b border-red-600">E-mail</label>
					<input
						type="text"
						onChange={handleChange}
						className="border-b border-red-600 bg-transparent pl-6 focus:outline-none"
					/>
				</div>
				<div className="flex gap-x-5">
					<input
						type="submit"
						value="Avançar"
						className="w-32 bg-black rounded-md py-2 text-sm font-bold text-white cursor-pointer"
					/>
					<input
						type="button"
						value="Cancelar"
						onClick={() => setShowPasswordForm(false)}
						className="w-32 border border-black rounded-md py-2 text-sm font-bold cursor-pointer"
					/>
				</div>
			</div>
		</form>
	);
}
