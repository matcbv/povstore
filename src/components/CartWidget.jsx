import { Link } from "react-router-dom";

export function CartWidget(){
    return (
        <div className="flex items-end">
            <Link to="/checkout"><img src="/assets/images/shopping_bag.png" alt="Sacola de compras" /></Link>
            {/* state.index > 0 && <span className="text-white ml-1 -mb-2 font-bold">{state.index > 99 ? '99+': state.index}</span> */}
        </div>
    );
};
