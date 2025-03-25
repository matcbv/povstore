import { Routes, Route } from 'react-router-dom';

// Componentes
import { Home } from './pages/Home';
import { Checkout } from './pages/Checkout';
import { Session } from './pages/Session';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { UserAccount } from './pages/UserAccount';
import { AddProduct } from './pages/AddProduct';
import { Favorites } from './pages/Favorites';
import { ProductsCatalog } from './pages/ProductsCatalog';

import { ProductProvider } from './contexts/ProductProvider/index';

export function AppRoutes(){
    return (
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/catalog/:gender/:category?/:subcategory?' element={
                <ProductProvider>
                    <ProductsCatalog />
                </ProductProvider>
            } />
            <Route path='/checkout' element={ <Checkout /> } />
            <Route path='/session' element={ <Session /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/account' element={ <UserAccount /> } />
            <Route path='/account/add-product' element={ <AddProduct /> } />
            <Route path='/account/favorites' element={ <Favorites /> } />
            <Route path='*' element={ <NotFound /> } />
        </Routes>
    );
};
