import { Link } from "react-router-dom";

export function OrderResume({ order }){
    return (
        <div className="flex items-center gap-x-10 font-bold">
            <div className="flex flex-col gap-y-5 h-[180px] overflow-y-scroll pr-4 custom-scrollbar">
                {order.items.map(item => (
                    <img key={item.name} className="max-h-40 object-contain cursor-pointer" src={item.imageURL} alt={item.name} />
                ))}
            </div>
            <div className="flex flex-col items-start gap-y-5">
                <div className="flex flex-col gap-y-2">
                    <p><span className="underline decoration-2 decoration-red-600 underline-offset-4">Código do pedido</span>: {order.id.slice(-6)}</p>
                    <p>Total de itens: {order.totalQuantity}</p>
                    <p>Valor do pedido: R$ {(order.finalPrice).toFixed(2).replace('.', ',')}</p>
                    <p>Status: {order.status}</p>
                </div>
                <Link to={`/account/orders/${order.id}`} className="bg-black rounded-md px-4 py-3 text-xs font-bold text-white">Ver detalhes do pedido</Link>
            </div>
        </div>
    )
}