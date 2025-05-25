import { CarouselCatalog } from '../components/CarouselCatalog';
import { Link } from 'react-router-dom';

export function Home() {
	return (
		<main>
			<section>
				<div className="flex justify-center lg:py-20 lg:bg-[radial-gradient(circle,_black,_white)]">
					<div className="relative w-full max-w-screen-lg h-[640px]">
						<video
							className="w-full h-full object-cover lg:shadow-xl lg:shadow-black absolute"
							src="/assets/videos/hero_video.mp4"
							autoPlay
							loop
							muted
						></video>
						<div className="flex flex-col justify-center gap-10 absolute bg-black/75 w-full h-full px-12">
							<h1 className="text-2xl md:text-4xl text-white font-bold">
								A moda vista de outra perspectiva.
							</h1>
							<div>
								<p className="text-white font-mono font-bold mb-4 md:text-lg">
									Nos momentos em que tudo parece não sair do lugar, a solução
									pode ser olhar de uma outra maneira.
								</p>
								<p className="text-white font-mono font-bold underline decoration-red-600 underline-offset-4 text-lg md:text-xl">
									A sua maneira.
								</p>
							</div>
							<button
								className="bg-black/75 rounded-lg text-white font-bold w-64 py-3 border border-black hover:border-white"
								type="button"
							>
								Nosso catálogo
							</button>
						</div>
					</div>
				</div>
			</section>
			<section className="border-y border-red-600">
				<div className="flex flex-col md:flex-row justify-evenly max-w-full h-screen">
					<div className="bg-[url('/assets/images/woman.jpg')] bg-cover bg-center flex justify-center w-full h-full">
						<Link to="/catalog/women" className="categories-btn">
							Feminino
						</Link>
					</div>
					<div className="bg-[url('/assets/images/man.jpg')] bg-cover bg-center flex justify-center w-full h-full">
						<Link to="/catalog/men" className="categories-btn">
							Masculino
						</Link>
					</div>
					<div className="bg-[url('/assets/images/child.jpg')] bg-cover bg-center flex justify-center w-full h-full">
						<Link to="/catalog/children" className="categories-btn">
							Infantil
						</Link>
					</div>
				</div>
			</section>
			<section className="flex flex-col items-center gap-y-20 py-[120px] bg-[linear-gradient(to_right,_#0000004a,_white,_#0000004a)]">
				<h1 className="text-2xl md:text-4xl font-bold">
					Coleção da estação<span className="text-red-600">.</span>
				</h1>
				<CarouselCatalog />
			</section>
		</main>
	);
}
