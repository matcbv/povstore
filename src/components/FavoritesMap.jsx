import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserProvider/context';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../database/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { getProduct } from '../utils/getProduct';
import { actionTypes } from '../contexts/ProductProvider/actionTypes';

export function FavoritesMap() {
	const navigate = useNavigate();
	const [state, dispatch] = useContext(UserContext);
	const [favorites, setFavorites] = useState({});

	useEffect(() => {
		const getFavorites = async () => {
			if (state.uid) {
				try {
					const userFavorites = await getDocs(
						collection(db, 'users', state.uid, 'favorites'),
					);
					userFavorites.docs.forEach(async (favorite) => {
						const productData = await getProduct(favorite.id);
						setFavorites((prevFavorites) => ({
							...prevFavorites,
							[favorite.id]: productData,
						}));
					});
					dispatch({ type: actionTypes.SET_LOADING, payload: false });
				} catch (e) {
					throw new Error(e);
				}
			}
		};
		getFavorites();
	}, [state.uid, dispatch]);

	const removeFavorite = async (favoriteID) => {
		const favoriteRef = doc(db, 'users', state.uid, 'favorites', favoriteID);
		await deleteDoc(favoriteRef);
		const newFavorites = { ...favorites };
		delete newFavorites[favoriteID];
		setFavorites(newFavorites);
	};

	if (state.loading) {
		return (
			<div className="w-full h-full flex flex-col items-center justify-center gap-y-10">
				<img
					className="w-60"
					src="/assets/images/loading.gif"
					alt="Caregando"
				/>
				<p className="font-bold text-2xl">
					Carregando favoritos<span className="text-red-600">...</span>
				</p>
			</div>
		);
	}

	if (Object.keys(favorites).length <= 0) {
		return (
			<div className="flex flex-col justify-center items-start gap-y-5">
				<h2 className="flex gap-x-2 text-2xl font-bold">
					Nenhum favorito adicionado
					<img src="/assets/images/no-favorites.png" alt="Nenhum favorito" />
				</h2>
				<Link
					to="/catalog"
					className="flex justify-center py-3 px-5 border-2 border-black rounded-md text-sm font-bold transition-colors hover:bg-black hover:text-white"
				>
					Veja outros produtos
				</Link>
			</div>
		);
	}

	return (
		<main className="grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] items-end justify-items-center gap-y-20 gap-x-16">
			{Object.entries(favorites).map(([k, v]) => (
				<div className="flex flex-col gap-y-5 items-center" key={k}>
					<div
						className="w-60 h-[356px] flex flex-col items-center justify-end relative font-bold transition-transform cursor-pointer group"
						onClick={() => navigate(`/catalog/product/${k}`)}
					>
						<div className="w-full h-full flex justify-center items-center relative">
							<img
								src={v.imageURL}
								alt={v.imageURL}
								className="object-cover max-h-60"
							/>
							<span className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"></span>
						</div>
						<p className="pl-2 border-l-2 border-red-600">{v.name}</p>
					</div>
					<button
						type="button"
						className="border-2 border-black px-4 py-1 rounded transition-colors hover:border-red-600"
						onClick={() => removeFavorite(k)}
					>
						Remover
					</button>
				</div>
			))}
		</main>
	);
}
