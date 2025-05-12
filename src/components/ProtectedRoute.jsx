import { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider/context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const [state] = useContext(UserContext);

	if (!state.userData) {
		navigate('/session');
		toast('Faça o login para prosseguir.');
	}

	return children;
}
