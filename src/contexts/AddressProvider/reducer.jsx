import { actionTypes } from './actionTypes';

export function reducer(state, action) {
	switch (action.type) {
		case actionTypes.SET_ADDRESSES:
			return { ...state, addresses: action.payload };
		case actionTypes.ADD_ADDRESS:
			return { ...state, addresses: [...state.addresses, action.payload] };
		case actionTypes.UPDATE_ADDRESS: {
			const updatedAdresses = state.addresses.map((address) =>
				address.id === action.payload.id ? action.payload : address,
			);
			return { ...state, addresses: updatedAdresses };
		}
		case actionTypes.DELETE_ADDRESS: {
			const filteredAddresses = state.addresses.filter(
				(address) => address !== action.payload,
			);
			return { ...state, addresses: filteredAddresses };
		}
		case actionTypes.SET_DEFAULT_ADDRESS: {
			const addresses = state.addresses.map((address) => ({
				...address,
				isDefault: address.id === action.payload.id,
			}));
			return { addresses, defaultAddress: action.payload };
		}
		default:
			return state;
	}
}
