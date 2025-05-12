import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { OrderContext } from '../contexts/OrderProvider/context';
import { OrderResume } from '../components/OrderResume';

export function Orders() {
	const navigate = useNavigate();
	const [orderState] = useContext(OrderContext);

	return (
		<main className="flex min-h-screen">
			<section className="w-full flex flex-col m-20 text-black">
				<div className="w-full flex justify-between items-center pb-20">
					<h1 className="text-2xl lg:text-3xl font-bold">
						Seus{' '}
						<span className="underline decoration-red-600 underline-offset-4">
							pedidos
						</span>
					</h1>
					<span
						className="flex flex-col items-center cursor-pointer font-bold"
						onClick={() => navigate('/account')}
					>
						<img
							src="/assets/images/return.png"
							alt="Voltar"
							className="w-6 lg:w-8"
						/>
						<p className="text-sm lg:text-base">Voltar</p>
					</span>
				</div>
				<div className="grid grid-cols-[repeat(auto-fill,_400px)] justify-center gap-20">
					{orderState.orders.map((order) => (
						<OrderResume key={order.id} order={order} />
					))}
				</div>
			</section>
		</main>
	);
}
