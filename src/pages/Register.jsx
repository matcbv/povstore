import { RegisterForm } from '../components/RegisterForm';

export function Register() {
	return (
		<main className="flex items-center justify-center min-h-screen bg-[linear-gradient(to_top,_#0000004a,_white_30%)]">
			<section className="flex justify-evenly my-20 items-center w-full">
				<div className="flex flex-col gap-y-12 items-start">
					<h1 className="text-3xl font-bold tracking-wide">Crie sua conta</h1>
					<RegisterForm />
				</div>
				<div className="hidden lg:flex flex-col justify-center">
					<img
						src="/assets/images/register.jpg"
						alt="Boas-vindas"
						className="p-4 pb-2 border-l border-t border-black"
					/>
					<p className="pl-4 text-2xl border-l border-black tracking-wide">
						Entre para o time dos que pensam fora da caixa
						<span className="text-red-600 text-4xl leading-5">.</span>
					</p>
				</div>
			</section>
		</main>
	);
}
