import { Routes, Route } from 'react-router-dom';

// Componentes
import { Home } from './pages/Home';
import { Bag } from './pages/Bag';
import { Session } from './pages/Session';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { Account } from './pages/Account';
import { AddProduct } from './pages/AddProduct';
import { Favorites } from './pages/Favorites';
import { ProductsCatalog } from './pages/ProductsCatalog';
import { ProductPage } from './pages/ProductPage';
import { Checkout } from './pages/Checkout';
import { EditAccount } from './pages/EditAccount';
import { PaymentMethods } from './pages/PaymentMethods';
import { Orders } from './pages/Orders';
import { OrdersDetails } from './pages/OrderDetails';

// Providers
import { ProductProvider } from './contexts/ProductProvider/index';
import { Dashboard } from './pages/Dashboard';

export function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route
				path="/catalog/:gender?/:category?/:subcategory?"
				element={
					<ProductProvider>
						<ProductsCatalog />
					</ProductProvider>
				}
			/>
			<Route path="/catalog/product/:productId" element={<ProductPage />} />
			<Route path="/bag" element={<Bag />} />
			<Route path="/checkout" element={<Checkout />} />
			<Route path="/session" element={<Session />} />
			<Route path="/register" element={<Register />} />
			{/* Definindo uma rota base para a conta do usuário a ser utilizada por suas rotas filhas */}
			<Route path="/account" element={<Account />}>
				{/* As rotas filhas devem possuir caminhos relativos */}
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="edit" element={<EditAccount />} />
				<Route path="add-product" element={<AddProduct />} />
				<Route path="favorites" element={<Favorites />} />
				<Route path="payment-methods" element={<PaymentMethods />} />
				<Route path="orders" element={<Orders />} />
				<Route path="orders/:orderId" element={<OrdersDetails />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
