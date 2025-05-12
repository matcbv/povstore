import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider/context';

export function Account() {
	const [state] = useContext(UserContext);

	// Checando se o usuário está logado
	if (!state.userData) {
		return <Navigate to={'/session'} state={{ isLoggedOut: true }} replace />;
	}

	return (
		<>
			<Header />
			{/* Através do componente Outlet, definimos onde as rotas filhas de Account serão posicionadas */}
			<Outlet />
			<Footer />
		</>
	);
}
