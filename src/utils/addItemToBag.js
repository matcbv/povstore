import { addDoc, collection, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../database/firebase';

export async function addItemToBag(uid, itemData) {
	try {
		const currentProduct = await getDoc(
			db,
			'users',
			uid,
			'checkout',
			,
		);
		if (currentProduct.exists()) {
			await updateDoc(currentProduct.ref, {
				quantity: currentProduct.data().quantity + 1,
			});
		} else {
			const itemRef = collection(db, 'users', uid, 'checkout');
			await setDoc(itemRef, itemData);
		}
		return { success: true, error: null };
	} catch (e) {
		return { success: false, error: e.message };
	}
}
