export function ProductsList({ gender, activeCategory }) {
	const products = {
		Masculino: {
			Roupas: ['Camisas', 'Camisetas', 'Jaquetas e Casacos', 'Moletons', 'Calças'],
			Calçados: ['Tênis', 'Sapatos', 'Mocassins', 'Botas'],
			Acessórios: ['Chapéus e Bonés', 'Bolsas e Mochilas', 'Cintos', 'Gravatas'],
		},
		Feminino: {
			Roupas: ['Camisas', 'Blusas', 'Vestidos', 'Moletons', 'Calças'],
			Calçados: ['Tênis', 'Saltos', 'Sapatilhas'],
			Acessórios: ['Chapéus e Bonés', 'Bolsas e Mochilas', 'Luvas'],
		},
		Infantil: {
			Roupas: ['Camisas', 'Camisetas', 'Jaquetas e Casacos', 'Vestidos', 'Macacões', 'Calças'],
			Calçados: ['Tênis', 'Botas', 'Sapatos', 'Mocassins', 'Sandálias'],
			Acessórios: ['Chapéus e Bonés', 'Mochilas', 'Suspensórios'],
		},
	};

	return (
		<>
			{activeCategory && (
				<ul className="flex flex-col justify-center gap-y-5 w-40 text-white text-md">
					{/* Realizando a iteração dos produtos com base no gênero e categoria ativos */}
					{products[gender][activeCategory].map((product) => (
						<li key={product} className="product-item cursor-pointer hover:font-bold">
							{product}
						</li>
					))}
				</ul>
			)}
		</>
	);
};
