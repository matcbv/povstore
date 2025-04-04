import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserProvider/context';
import { DropdownMenu } from '../components/DropdownMenu';
import { CheckoutContext } from '../contexts/CheckoutProvider/context';

export function Header() {
	const [userState, ] = useContext(UserContext);
	const [checkoutState, ] = useContext(CheckoutContext);
	const [dropdown, setDropdown] = useState(false);
	console.log(checkoutState.totalQuantity);
	return (
		<header className="w-full flex items-center justify-between px-12 h-20 bg-black sticky top-0 z-10">
			<h1 className="text-5xl text-white">
				<Link to="/">
					POV<span className="text-red-600">.</span>
				</Link>
			</h1>
			<nav className="flex items-center">
				<ul className="flex gap-x-6 items-center">
					<li>
						{userState.uid ? 
							(<Link className="text-white font-bold" to="/account">Minha conta</Link>) : 
							(<Link className="text-white font-bold" to="/session">Iniciar sessão</Link>)
						}
					</li>
					<li>
						<div className="flex items-center gap-x-1 cursor-pointer" onMouseEnter={ () => setDropdown(true) }>
							<Link to="/catalog" className="text-white font-bold">Catálogo</Link>
							<img
								src="/assets/images/bottom_arrow.png"
								alt="Seta para baixo"
								className="transition-transform"
								style={{transform: dropdown ? 'rotate(180deg)' : 'rotate(0deg)'}}
							/>
						</div>
					</li>
					<li>
						<Link to="/">
							<img src="/assets/images/search.png" alt="Pesquisar" />
						</Link>
					</li>
					<li>
						<Link to="/bag" className="flex items-end relative">
							<img src="/assets/images/shopping_bag.png" alt="Sacola de compras" />
							{checkoutState.totalQuantity > 0 && <span className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white font-bold">{checkoutState.totalQuantity}</span>}
        				</Link>
					</li>
				</ul>
			</nav>
			{dropdown && <DropdownMenu setDropdown={setDropdown} />}
		</header>
	);
};
