export function Footer(){
    return (
        <footer className="flex flex-col md:flex-row justify-center items-center gap-y-8 md:gap-y-0 gap-x-10 md:gap-x-16 py-12 text-white bg-black">
            <div className="flex gap-x-10 md:gap-x-16">
                <div className="w-1/2">
                    <p className="font-bold border-b border-red-600 mb-4 font-mono">Empresa</p>
                    <ul className="space-y-1">
                        <li>Sobre nós</li>
                        <li>Lojas</li>
                    </ul>
                </div>
                <div className="w-1/2">
                    <p className="font-bold border-b border-red-600 mb-4 font-mono">Pagamento</p>
                    <ul className="space-y-1">
                        <li>Formas de pagamento</li>
                        <li>Devoluções e reembolsos</li>
                    </ul>
                </div>
            </div>
            <div className="flex gap-x-10 md:gap-x-16">
                <div className="w-1/2">
                    <p className="font-bold border-b border-red-600 mb-4 font-mono">Ajuda</p>
                    <ul className="space-y-1">
                        <li>Contate-nos</li>
                        <li>Frete e prazos de entrega</li>
                    </ul>
                </div>
                <div className="w-1/2">
                    <p className="font-bold border-b border-red-600 mb-4 font-mono">Siga-nos</p>
                    <ul className="space-y-1">
                        <li>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </li>
                        <li>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
                        </li>
                    </ul>
                </div>
            </div>

        </footer>
    );
};
