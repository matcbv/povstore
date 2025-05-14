import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';
import { SessionForm } from '../components/SessionForm';

import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PasswordForm } from '../components/PasswordForm';

export function Session() {
	const [showPasswordForm, setShowPasswordForm] = useState(false);
	const routeState = useLocation().state;

	useEffect(() => {
		if (routeState?.isLoggedOut) {
			toast.error('Faça login para prosseguir.');
		}
	});

	return (
		<>
			<Header />
			<main className="flex items-center justify-center min-h-screen bg-[linear-gradient(#0000004a,_white_30%)]">
				<section className="flex justify-evenly items-center my-20 w-full">
					<div className="flex flex-col gap-y-12 items-start">
						{showPasswordForm ? (
							<>
								<h1 className="text-3xl font-bold tracking-wide">
									Troque sua senha
								</h1>
								<PasswordForm setShowPasswordForm={setShowPasswordForm} />
							</>
						) : (
							<>
								<h1 className="text-3xl font-bold tracking-wide">Faça login</h1>
								<SessionForm setShowPasswordForm={setShowPasswordForm} />
							</>
						)}
						<div className="flex flex-col gap-y-2 w-full">
							<h2 className="font-bold">Ainda não possui conta?</h2>
							<Link
								to="/register"
								className="border border-black text-center rounded w-full py-1 hover:font-bold"
							>
								Criar conta
							</Link>
						</div>
					</div>
					<div className="w-fit hidden lg:flex justify-center">
						<img
							src="/assets/images/welcome.webp"
							alt="Boas-vindas"
							className="w-4/5 p-4 border-r border-b border-black"
						/>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
