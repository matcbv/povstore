export function QuantitySelector({ setQuantity, item }){
    return (
        <div className='flex flex-col items-center gap-y-2'>
            <p>Quantidade:</p>
            <span className='flex gap-x-4'>
                <img
                    src="/assets/images/decrease.png"
                    alt="Diminuir"
                    className='cursor-pointer'
                    onClick={ () => setQuantity(item?.productId, false) }
                />
                <span>{item?.quantity}</span>
                <img
                    src="/assets/images/increase.png"
                    alt="Aumentar"
                    className='cursor-pointer'
                    onClick={ () => setQuantity(item?.productId, true) }
                />
            </span>
        </div>
    )
}