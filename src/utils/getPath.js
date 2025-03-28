export const gendersMap = {
    Masculino: 'men',
    Feminino: 'women',
    Infantil: 'children',
};

export const categoriesMap = {
    Roupas: 'clothes',
    Calçados: 'footwear',
    Acessórios: 'acessories',
};

export const catalogMap = {
    men: {
        clothes: {
            'Camisas': 'shirts',
            'Camisetas': 't-shirts',
            'Jaquetas e Casacos': 'jackets-coats',
            'Moletons': 'hoodies',
            'Calças': 'pants',
        },
        footwear: {
            'Tênis': 'sneakers',
            'Sapatos': 'shoes',
            'Mocassins': 'mocassins',
            'Botas': 'boots',
        },
        acessories: {
            'Chapéus e Bonés': 'hats-caps',
            'Bolsas e Mochilas': 'bags-backpacks',
            'Cintos': 'belts',
            'Gravatas': 'ties',
        },
    },
    women: {
        clothes: {
            'Camisas': 'shirts',
            'Blusas': 'blouses',
            'Vestidos': 'dresses',
            'Moletons': 'hoodies',
            'Calças': 'pants',
        },
        footwear: {
            'Tênis': 'sneakers',
            'Saltos': 'heels',
            'Sapatilhas': 'flats',
        },
        acessories: {
            'Chapéus e Bonés': 'hats-caps',
            'Bolsas e Mochilas': 'bags-backpacks',
            'Luvas': 'gloves',
        },
    },
    children: {
        clothes: {
            'Camisas': 'shirts',
            'Camisetas': 't-shirts',
            'Jaquetas e Casacos': 'jackets-coats',
            'Vestidos': 'dresses',
            'Macacões': 'overalls',
            'Calças': 'pants',
        },
            footwear: {
            'Tênis': 'sneakers',
            'Sapatos': 'shoes',
            'Mocassins': 'mocassins',
            'Botas': 'boots',
            'Sandálias': 'sandals',
        },
            acessories: {
            'Chapéus e Bonés': 'hats-caps',
            'Mochilas': 'bags-backpacks',
            'Suspensórios': 'suspenders',
        },
    },
};

export function getPath(gender, category, subcategory){
    const basePath = '/catalog';

    if(gender && category && subcategory){
        return `${basePath}/${gender}/${category}/${subcategory}`;
    } else if(gender && category){
        return `${basePath}/${gender}/${category}`;
    } else{
        return `${basePath}/${gender}`;
    };
};
