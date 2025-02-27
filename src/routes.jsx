import { Routes, Route } from 'react-router-dom';

// Componentes
import { Home } from './pages/Home';
import { Checkout } from './pages/Checkout';
import { Session } from './pages/Session';
import { Register } from './pages/Register';

export function AppRoutes(){
    return (
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/checkout' element={<Checkout />}/>
            <Route path='/session' element={<Session />}/>
            <Route path='/register' element={<Register />}/>
        </Routes>
    );
};
