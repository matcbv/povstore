import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserProvider/context';

export function Account() {
	const [userState] = useContext(UserContext);
	const navigate = useNavigate();
	const location = useLocation();

	// Checando se o usuário está logado
	useEffect(() => {
		if (!userState.loading) {
			userState.userData
				? navigate(location.pathname)
				: navigate('/session', { state: { isLoggedOut: true }, replace: true });
		}
	}, [userState, navigate, location.pathname]);

	// Através do componente Outlet, definimos onde as rotas filhas de Account serão posicionadas
	return <Outlet />;
}
