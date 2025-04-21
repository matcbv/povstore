export function AddressResume({ address }){
    return (
        <div className="flex flex-col items-start gap-y-2">
            <p>CEP: {address?.cep}</p>
            <p>{address?.street}, {address?.number} - {address?.neighborhood}</p>
            <p>{address?.city} - {address?.state}</p>
            <p>{address?.complement}</p>
        </div>
    );
};
