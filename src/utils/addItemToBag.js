import {
	addDoc,
	collection,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../database/firebase';

export async function addItemToBag(uid, itemData) {
	try {
		const collectionRef = collection(db, 'users', uid, 'checkout');
		const q = query(
			collectionRef,
			where('productId', '==', itemData.productId),
		);
		const queryDocs = (await getDocs(q)).docs;
		if (queryDocs.length > 0 && queryDocs[0].data().size === itemData.size) {
			const itemSnap = queryDocs[0];
			await updateDoc(itemSnap.ref, { quantity: itemSnap.data().quantity + 1 });
		} else {
			await addDoc(collectionRef, itemData);
		}
		return { success: true, error: null };
	} catch (e) {
		return { success: false, error: e.message };
	}
}
