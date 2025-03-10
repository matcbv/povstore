import { Routes, Route } from 'react-router-dom';

// Componentes
import { Home } from './pages/Home';
import { Checkout } from './pages/Checkout';
import { Session } from './pages/Session';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { UserAccount } from './pages/UserAccount';

export function AppRoutes(){
    return (
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/checkout' element={ <Checkout /> } />
            <Route path='/session' element={ <Session /> } />
            <Route path='/register' element={ <Register /> } />
            <Route path='/account' element={ <UserAccount /> } />
            <Route path='*' element={ <NotFound /> } />
        </Routes>
    );
};
