export function Submenu({ gender, activeCategory }){
    const products = {
        Masculino: {
            Roupas: ["Camisas", "Camisetas", "Jaquetas e Casacos", "Moletons", "Calças"],
            Calçados: ["Tênis", "Sapatos", "Mocassins", "Botas"],
            Acessórios: ["Chapéus e Bonés", "Bolsas e Mochilas", "Cintos", "Gravatas"],
        },
        Feminino: {
            Roupas: ["Camisas", "Blusas", "Vestidos", "Moletons", "Calças"],
            Calçados: ["Tênis", "Saltos", "Sapatilhas"],
            Acessórios: ["Chapéus e Bonés", "Bolsas e Mochilas", "Luvas"]
        },
        Infantil: {
            Roupas: ["Camisas", "Camisetas", "Jaquetas e Casacos", "Vestidos", "Macacões", "Calças"],
            Calçados: ["Tênis", "Botinhas", "Sapatinhos", "Mocassins", "Sandálias"],
            Acessórios: ["Chapéus e Bonés", "Mochilas", "Luvas", "Gravatinhas"]
        },
    };

    return (
        <>
            {activeCategory && (
                <ul className="submenuProducts flex flex-col justify-center gap-y-6 w-40 text-white text-md">
                    {products[gender][activeCategory].map((product) => (
                        <li key={product} className="product-item hover:cursor-pointer hover:font-bold">{product}</li>
                    ))}
                </ul>
            )}
        </>
    );
};
