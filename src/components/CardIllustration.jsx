export function CardIllustration({ paymentData }){
    return (
        <div className="w-[350px] h-[225px] flex flex-col justify-between items-start p-5 rounded-lg bg-black text-white">
            <img src="/assets/images/card_flag.png" alt="Bandeira do cartão" />
            <div className="flex flex-col gap-y-4">
                <p>{paymentData.cardholderName ? paymentData.cardholderName : 'Nome do titular'}</p>
                <p className="text-lg">{paymentData.cardNumber ? paymentData.cardNumber : '**** **** **** ****'}</p>
                <div className="flex gap-x-10">
                    <span className="flex flex-col">
                        <p className="text-[0.6rem]">VALID THRU</p>
                        <p>{paymentData.validThru ? paymentData.validThru : '**/**'}</p>
                    </span>
                    <span className="flex flex-col">
                        <p className="text-[0.6rem]">CVC</p>
                        <p>{paymentData.cvc ? paymentData.cvc : '***'}</p>
                    </span>
                </div>
            </div>
        </div>
    );
};
