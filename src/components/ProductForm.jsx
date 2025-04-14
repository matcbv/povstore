import { useState } from "react";
import { addProduct } from "../utils/addProduct";
import { toast } from "react-toastify";

export function ProductForm(){
    const [productImage, setProductImage] = useState(null);
    const initialData = {
        name: '',
        description: '',
        gender: 'unisex',
        category: 'clothes',
        subcategory: '',
        price: '',
        quantity: 1,
    };

    const [productData, setProductData] = useState(initialData);

    const handleChange = (e) => {
        setProductData({
            ...productData, [e.target.name]: e.target.value
        });
        if(e.target.name === 'quantity'){
            e.target.value <= 0 && setProductData({...productData, quantity: 1});
        };
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setProductImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(checkData()){
            toast.error('Preencha todos os campos para adicionar o produto.');
            return;
        };
        const response = await addProduct(productData, productImage);
        if(response.success){
            toast.success('Produto adicionado com sucesso.');
            setProductData(initialData);
            setProductImage(null);
        } else{
            throw new Error(response.error);
        };
    };

    const checkData = () => {
        let hasError = false;
        for(const value of Object.values(productData)){
            if(!value){
                hasError = true;
            };
        };
        if(!productImage){
            hasError = true;
        };
        
        const productPrice = Number.parseFloat(productData.price.replace(',', '.'));
        if(!productPrice || productPrice <= 0){
            hasError = true;
        }
        return hasError;
    };

    return (
        <form className="flex flex-col-reverse lg:flex-row items-center gap-y-10 md:gap-y-0 md:gap-x-20 w-full max-w-xl lg:max-w-4xl" onSubmit={ handleSubmit }>
            <div className="h-full flex flex-col justify-end items-center gap-y-5 w-2/3 lg:w-1/2">
                <div className="max-w-[360px] max-h-[360px] flex justify-center items-center">
                    <img src={productImage ? URL.createObjectURL(productImage) : "/assets/images/no_image.jpg"} alt={productImage} className="max-w-full max-h-full" />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="image" className="py-2 bg-black border-2 rounded-md text-center text-white cursor-pointer">Escolher Arquivo</label>
                    <input name="image" id="image" type="file" accept="image/png" className="hidden" onChange={ handleImage } />
                </div>
                <input type="submit" value="Adicionar produto" className="w-full border-2 border-black rounded-md px-10 py-2 font-bold cursor-pointer" />
            </div>
            <div className="flex flex-col gap-y-8 w-2/3 lg:w-1/2 h-full">
                <div className="flex flex-col">
                    <label htmlFor="name" className="font-bold text-sm md:text-base">Nome do produto<span className="text-red-600">:</span></label>
                    <input type="text" name="name" id="name" value={ productData.name } className="default-inputs" onChange={ handleChange } />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description" className="font-bold text-sm md:text-base">Descrição<span className="text-red-600">:</span></label>
                    <textarea name="description" id="description" rows={6} value={ productData.description } className="default-inputs resize-none" onChange={ handleChange } />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="category" className="font-bold text-sm md:text-base">Categoria<span className="text-red-600">:</span></label>
                    <select name="category" id="category" value={ productData.category } className="default-inputs" onChange={ handleChange }>
                        <option value="unisex">Unissex</option>
                        <option value="man">Masculino</option>
                        <option value="woman">Feminino</option>
                        <option value="child">Infantil</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price" className="font-bold text-sm md:text-base">Preço<span className="text-red-600">:</span></label>
                    <input type="text" name="price" id="price" value={ productData.price } className="default-inputs" onChange={ handleChange } />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="quantity" className="font-bold text-sm md:text-base">Estoque<span className="text-red-600">:</span></label>
                    <input type="number" name="quantity" id="quantity" value={ productData.quantity } min={1} className="default-inputs" onChange={ handleChange } />
                </div>
            </div>
        </form>
    );
};
