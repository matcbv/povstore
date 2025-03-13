import { useState } from "react";
import { addProduct } from "../database/addProduct";

export function ProductForm(){
    const [imagePreview, setImagePreview] = useState(null);

    const [dataObject, setDataObject] = useState({
        name: '',
        description: '',
        price: '',
        quantity: 1,
        imageURL: '',
    });

    const [errorObject, setErrorObject] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        imageURL: '',
    });

    const handleChange = (e) => {
        for(let k in errorObject){
            if(k === e.target.name){
                setErrorObject({...errorObject, [k]: ''});
            };
        };
        setDataObject({
            ...dataObject, [e.target.name]: e.target.value.trim()
        });
        if(e.target.name === 'quantity'){
            e.target.value <= 0 && setDataObject({...dataObject, quantity: 1});
        };
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setDataObject({...dataObject, imageRef:file })
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(checkData()){
            return;
        };
        addProduct(dataObject);
    };

    const checkData = () => {
        let hasError = false;
        
        for(let k in dataObject){
            if(!dataObject[k]){
                hasError = true;
                setErrorObject((prev) => ({...prev, [k]: 'Campo obrigatório'}));
            };
        };
        return hasError;
    };

    return (
        <form className="flex flex-col-reverse lg:flex-row items-center gap-y-10 md:gap-y-0 md:gap-x-20 w-full max-w-xl lg:max-w-4xl" onSubmit={ handleSubmit }>
            <div className="flex flex-col items-center gap-y-5 w-2/3 lg:w-1/2">
                <div className="w-[360px] h-[360px] flex justify-center items-center">
                    <img src={imagePreview ? imagePreview: "/assets/images/no_image.jpg"} alt="Nenhuma imagem escolhida." />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="image" className="py-2 bg-black border-2 rounded-md text-center text-white cursor-pointer">Escolher Arquivo</label>
                    <input name="image" id="image" type="file" accept="image/png" className="hidden" onChange={ handleImage } />
                </div>
                <input type="submit" value="Enviar" className="w-full border-2 border-black rounded-md px-10 py-2 font-bold cursor-pointer hover:border-red-600 transition-colors" />
            </div>
            <div className="flex flex-col justify-between gap-y-10 lg:gap-y-0 w-2/3 lg:w-1/2 h-full">
                <div className="flex flex-col">
                    <label htmlFor="name" className="font-bold font-mono text-sm md:text-base">Nome do produto<span className="text-red-600">:</span></label>
                    <input type="text" name="name" id="name" placeholder={ errorObject.name } value={ dataObject.name } className="product-inputs" onChange={ handleChange } />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="font-bold font-mono text-sm md:text-base">Descrição<span className="text-red-600">:</span></label>
                    <textarea name="description" id="description" rows={6} placeholder={ errorObject.description } value={ dataObject.description } className="product-inputs resize-none" onChange={ handleChange } />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price" className="font-bold font-mono text-sm md:text-base">Preço<span className="text-red-600">:</span></label>
                    <input type="text" name="name" id="name" placeholder={ errorObject.price } value={ dataObject.price } className="product-inputs" onChange={ handleChange } />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="quantity" className="font-bold font-mono text-sm md:text-base">Estoque<span className="text-red-600">:</span></label>
                    <input type="number" name="quantity" id="quantity" placeholder={ errorObject.quantity } defaultValue={1} min={1} value={ dataObject.quantity } className="product-inputs" onChange={ handleChange } />
                </div>
            </div>
        </form>
    );
};
