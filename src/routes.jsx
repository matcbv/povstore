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

// Providers
import{ ProductProvider } from './contexts/ProductProvider/index';
import { EditAccount } from './pages/EditAccount';

export function AppRoutes(){
    return (
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/catalog/:gender?/:category?/:subcategory?' element={
                <ProductProvider>
                    <ProductsCatalog />
                </ProductProvider>
            } />
            <Route path='/catalog/product/:productId' element={ <ProductPage /> } />
            <Route path='/bag' element={ <Bag /> } />
            <Route path='/checkout' element={ <Checkout /> } />
            <Route path='/session' element={ <Session /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/account' element={ <Account /> } />
            <Route path='/account/edit' element={ <EditAccount /> } />
            <Route path='/account/add-product' element={ <AddProduct /> } />
            <Route path='/account/favorites' element={ <Favorites /> } />
            <Route path='*' element={ <NotFound /> } />
        </Routes>
    );
};
