import { useEffect, useReducer } from 'react';
import { UserContext } from './context';
import { reducer } from './reducer';
import { data } from './data';
import { checkAuth } from '../../database/auth';

export function UserProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, data);

	useEffect(() => checkAuth(dispatch), []);

	return (
		<UserContext.Provider value={[state, dispatch]}>
			{children}
		</UserContext.Provider>
	);
}
