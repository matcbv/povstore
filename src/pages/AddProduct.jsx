import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';

export function AddProduct() {
	const navigate = useNavigate();

	return (
		<main className="flex flex-col gap-y-20 min-h-screen my-20">
			<div className="flex justify-between items-center px-10 lg:px-40">
				<h1 className="text-2xl lg:text-3xl font-bold">
					Área de
					<span className="underline decoration-red-600 underline-offset-4">
						produtos
					</span>
				</h1>
				<span
					className="flex flex-col items-center cursor-pointer font-bold"
					onClick={() => navigate('/account/dashboard')}
				>
					<img
						src="/assets/images/return.png"
						alt="Voltar"
						className="w-6 lg:w-8"
					/>
					<p className="text-sm lg:text-base">Voltar</p>
				</span>
			</div>
			<div className="flex justify-center">
				<ProductForm />
			</div>
		</main>
	);
}
