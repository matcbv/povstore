import { BrowserRouter } from 'react-router-dom';
// ToastContainer é responsável por renderizar as notificações na tela, funcionando como um template para exibir os toasts quando o toast() é chamado em qualquer parte da aplicação. É recomendado sempre adicionarmos apenas um ToastContainer de escopo global, como em nosso App.
import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './routes';
import './assets/styles/global.css';
import { AppProviders } from './AppProviders';

export function App(){
    return (
        <>
            <AppProviders>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </AppProviders>
            {/* As configurações passadas para ToastContainer serão aplicadas de forma global. */}
            <ToastContainer position='top-center' theme='dark' />
        </>
    );
};
