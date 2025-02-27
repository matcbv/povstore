import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartProvider';

import { AppRoutes } from './routes';

import './global.css';

export function App(){
    return (
        <CartProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </CartProvider>
    );
};
