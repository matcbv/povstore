import { useNavigate, useParams } from 'react-router-dom';
import { getProducts } from '../utils/getProducts';
import { useContext, useEffect, useState } from 'react';
import { CatalogFilter } from '../components/CatalogFilter';
import { ProductList } from '../components/ProductList';
import { ProductContext } from '../contexts/ProductProvider/context';
import { actionTypes } from '../contexts/ProductProvider/actionTypes';
import { gendersMap } from '../utils/getPath';

export function ProductsCatalog() {
	const params = useParams();
	const navigate = useNavigate();
	const [products, setProducts] = useState(null);
	const [state, dispatch] = useContext(ProductContext);

	useEffect(() => {
		// Atualizando o filtro do catálogo através dos parâmetros recebidos
		dispatch({ type: actionTypes.SET_ACTIVE_GENDER, payload: params.gender });
		dispatch({
			type: actionTypes.SET_ACTIVE_CATEGORY,
			payload: params.category,
		});
		dispatch({
			type: actionTypes.SET_ACTIVE_SUBCATEGORY,
			payload: params.subcategory,
		});

		async function callGetProducts() {
			const products = await getProducts(
				params.gender,
				params.category,
				params.subcategory,
			);
			setProducts(products);
			dispatch({ type: actionTypes.SET_LOADING, payload: false });
		}
		callGetProducts();
	}, [dispatch, params.gender, params.category, params.subcategory]);

	return (
		<main className="flex min-h-screen">
			<CatalogFilter />
			<section className="w-full flex flex-col m-20 text-black">
				<div className="w-full flex justify-between pb-20 font-bold">
					<h1 className="text-2xl md:text-3xl">
						Catálogo{' '}
						<span className="underline decoration-red-600 underline-offset-4">
							{state.activeGender
								? Object.keys(gendersMap).find(
										(k) => gendersMap[k] === state.activeGender,
									)
								: 'geral'}
						</span>
					</h1>
					<span
						className="flex flex-col items-center cursor-pointer"
						onClick={() => navigate(-1)}
					>
						<img src="/assets/images/return.png" alt="Voltar" />
						<p>Voltar</p>
					</span>
				</div>
				<ProductList products={products} />
			</section>
		</main>
	);
}
