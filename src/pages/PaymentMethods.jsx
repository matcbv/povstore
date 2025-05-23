import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { PaymentContext } from '../contexts/PaymentProvider/context';
import { PaymentMethodsList } from '../components/PaymentMethodsList';
import { PaymentMethodsForm } from '../components/PaymentMethodsForm';

export function PaymentMethods() {
	const [paymentState] = useContext(PaymentContext);
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState(false);
	const [currentData, setCurrentData] = useState(null);

	return (
		<main className="flex min-h-screen">
			<section className="w-full flex flex-col m-20 text-black font-bold">
				<div className="w-full flex justify-between pb-20">
					<h1 className="text-2xl md:text-3xl">
						Métodos de
						<span className="underline decoration-red-600 underline-offset-4">
							pagamento
						</span>
					</h1>
					<span
						className="flex flex-col items-center cursor-pointer"
						onClick={() => navigate('/account/dashboard')}
					>
						<img src="/assets/images/return.png" alt="Voltar" />
						<p>Voltar</p>
					</span>
				</div>
				<div className="w-full h-full flex flex-col gap-y-5">
					{isVisible ? (
						<PaymentMethodsForm
							setIsVisible={setIsVisible}
							currentState={[currentData, setCurrentData]}
						/>
					) : paymentState.paymentMethods.length > 0 ? (
						<PaymentMethodsList
							setIsVisible={setIsVisible}
							setCurrentData={setCurrentData}
						/>
					) : (
						<>
							<h2 className="text-lg">
								Nenhum método de pagamento adicionado.
							</h2>
							<button
								type="button"
								className="w-40 bg-black rounded-md py-3 text-sm font-bold text-white"
								onClick={() => setIsVisible(true)}
							>
								Adicionar cartão
							</button>
						</>
					)}
				</div>
			</section>
		</main>
	);
}
