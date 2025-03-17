import { useState } from "react";

export function CatalogFilter({ gender, category }){
    const [activeCategory, setActiveCategory] = useState(category);

    const categories = {
		man: {
			clothes: ['Camisas', 'Camisetas', 'Jaquetas e Casacos', 'Moletons', 'Calças'],
			footwear: ['Tênis', 'Sapatos', 'Mocassins', 'Botas'],
			accessories: ['Chapéus e Bonés', 'Bolsas e Mochilas', 'Cintos', 'Gravatas'],
		},
		woman: {
			clothes: ['Camisas', 'Blusas', 'Vestidos', 'Moletons', 'Calças'],
			footwear: ['Tênis', 'Saltos', 'Sapatilhas'],
			accessories: ['Chapéus e Bonés', 'Bolsas e Mochilas', 'Luvas'],
		},
		child: {
			clothes: ['Camisas', 'Camisetas', 'Jaquetas e Casacos', 'Vestidos', 'Macacões', 'Calças'],
			footwear: ['Tênis', 'Botas', 'Sapatos', 'Mocassins', 'Sandálias'],
			accessories: ['Chapéus e Bonés', 'Mochilas', 'Suspensórios'],
		},
    };

    return (
        <nav className="h-screen w-80 flex flex-col items-center gap-y-10 py-10 sticky top-20 px-8 bg-black/90 shadow-[20px_0px_30px_rgba(0,0,0,0.2)] text-white font-bold">        
            <div className="w-full flex flex-col gap-y-10">
                <h2 className="text-2xl border-b border-b-red-600">Filtros</h2>
                <div className="flex flex-col gap-y-10">
                    <div className="flex flex-col gap-y-5">
                        <h3 className="text-xl">Categoria</h3>
                        <ul className="flex flex-col gap-y-2 pl-2">
                            {['Roupas', 'Calçados', 'Acessórios'].map(c => (
                                <li
                                    key={c}
                                    className="flex transition-transform hover:translate-x-2 cursor-pointer"
                                    onClick={ () => setActiveCategory(c) }
                                >
                                    <img src="/assets/images/catalog_right_arrow.png" alt={c} />
                                    {activeCategory === c ? c+' ✓' : c}
                                </li>
                            ))}    
                        </ul>
                    </div>
                    {activeCategory && (
                        <div className="flex flex-col gap-y-5">
                            <h3 className="text-lg">Tipo de produto</h3>
                            <ul className="flex flex-col gap-y-2 pl-2">
                                {categories[gender][activeCategory]?.map((p) => (
                                    <li key={p} className="flex transition-transform hover:translate-x-2 cursor-pointer">
                                        <img src="/assets/images/catalog_right_arrow.png" alt={p} />
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <button type="button" className="w-full flex items-center justify-center gap-x-1 py-3 rounded-md transition-colors hover:bg-black">
                <img src="/assets/images/remove.png" alt="Limpar filtros" />
                Limpar filtros
            </button>
            <span className="absolute right-0 top-1/2 transition-transform translate-x-1/2 hover:scale-105 cursor-pointer bg-white rounded-full">
                <img src="/assets/images/carousel_left_arrow.png" alt="Esconder filtros" className="w-10" /> 
            </span>
        </nav>
    );
};
