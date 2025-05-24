import { BagList } from '../components/BagList';
import { useNavigate } from 'react-router-dom';
import { BagResume } from '../components/BagResume';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider/context';
import { CheckoutContext } from '../contexts/CheckoutProvider/context';
import { toast } from 'react-toastify';

export function Bag() {
	const navigate = useNavigate();
	const [userState] = useContext(UserContext);
	const [checkoutState] = useContext(CheckoutContext);

	const checkBag = () => {
		if (checkoutState.items.length > 0) {
			userState.userDatanavigate('/checkout')
				? navigate('/checkout')
				: navigate('/session');
		} else {
			toast.error('Adicione ao menos um item à sacola para continuar.');
		}
	};

	return (
		<main className="min-h-screen flex flex-col gap-y-20 my-20 mx-10 lg:mx-40">
			<div className="flex justify-between items-center">
				<h1 className="font-bold text-2xl lg:text-3xl underline decoration-red-600 underline-offset-4">
					Sacola de compras
				</h1>
				<span
					className="flex flex-col items-center cursor-pointer"
					onClick={() => navigate(-1)}
				>
					<img
						src="/assets/images/return.png"
						alt="Voltar"
						className="w-6 lg:w-8"
					/>
					<p className="text-sm lg:text-base">Voltar</p>
				</span>
			</div>
			<section className="flex justify-center gap-x-40 items-start">
				<BagList />
				<div className="flex flex-col gap-y-10">
					<BagResume />
					<button
						type="button"
						onClick={checkBag}
						className="py-3 bg-black rounded-md text-white text-center font-bold hover:scale-105 transition-transform"
					>
						Continuar compra
					</button>
				</div>
			</section>
		</main>
	);
}
