import { useContext } from 'react';
import { CheckoutContext } from '../contexts/CheckoutProvider/context';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../database/firebase';
import { UserContext } from '../contexts/UserProvider/context';
import {
	collection,
	deleteDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { actionTypes } from '../contexts/CheckoutProvider/actionTypes';
import { updateCheckout } from '../utils/updateCheckout';
import { QuantitySelector } from './QuantitySelector';

export function BagList() {
	const navigate = useNavigate();
	const [userState] = useContext(UserContext);
	const [checkoutState, checkoutDispatch] = useContext(CheckoutContext);

	const setQuantity = async (productId, increase) => {
		const checkoutRef = collection(db, 'users', userState.uid, 'checkout');
		const q = query(checkoutRef, where('productId', '==', productId));
		const itemSnap = (await getDocs(q)).docs[0];
		const itemData = itemSnap.data();
		const itemRef = itemSnap.ref;
		if (increase) {
			await updateDoc(itemRef, {
				...itemData,
				quantity: itemData.quantity + 1,
			});
			checkoutDispatch({
				type: actionTypes.SET_TOTAL_QUANTITY,
				payload: checkoutState.totalQuantity + 1,
			});
		} else {
			itemData.quantity <= 1
				? deleteDoc(itemRef)
				: await updateDoc(itemRef, {
						...itemData,
						quantity: itemData.quantity - 1,
					});
			checkoutDispatch({
				type: actionTypes.SET_TOTAL_QUANTITY,
				payload: checkoutState.totalQuantity - 1,
			});
		}
		updateCheckout(userState.uid, checkoutDispatch);
	};

	if (Object.keys(checkoutState.items).length <= 0) {
		return (
			<section className="flex flex-col items-start gap-y-5">
				<p className="text-lg font-bold">
					Ops... Ainda não há itens em sua sacola.
				</p>
				<Link
					to="/catalog"
					className="bg-black text-white p-3 px-6 rounded transition-transform hover:scale-105"
				>
					Continuar comprando
				</Link>
			</section>
		);
	}

	return (
		<div className="flex flex-col gap-y-20">
			{checkoutState.items.map((item) => (
				<div className="flex gap-x-10" key={item.name}>
					<img
						src={item.imageURL}
						alt={item.name}
						className="w-40 max-h-60 object-contain cursor-pointer"
						onClick={() => navigate(`/catalog/product/${item.productId}`)}
					/>
					<div className="flex flex-col items-start gap-y-3">
						<p className="underline underline-offset-4 decoration-2 decoration-red-600 text-lg font-bold">
							{item.name}
						</p>
						<p>R$ {item.price}</p>
						<p>Tamanho: {item.size}</p>
						<QuantitySelector setQuantity={setQuantity} item={item} />
					</div>
				</div>
			))}
		</div>
	);
}
