import { Footer } from "../layouts/Footer";
import { Header } from "../layouts/Header";

export function AddProduct(){
    return (
        <>
            <Header />
                <main className="flex flex-col gap-y-20 h-screen my-20">
                    <div className="flex justify-between items-center px-8 md:px-40">
                        <h1 className="text-2xl md:text-4xl font-bold">Área de <span className="underline decoration-red-600 underline-offset-4">produtos</span></h1>
                        <span className="flex flex-col items-center cursor-pointer font-bold">
                            <img src="/assets/images/return.png" alt="Voltar" />
                            Voltar
                        </span>
                    </div>
                    <div className="flex justify-center">
                        <form className="flex gap-x-20 w-full max-w-5xl">
                            <div className="w-1/2 flex flex-col items-center gap-y-5">
                                <div className="">
                                    <img src="/assets/images/no_image.jpg" alt="Nenhuma imagem escolhida." />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="image" className="p-2 bg-black border-2 rounded-md text-center text-white cursor-pointer">
                                        Escolher Arquivo
                                    </label>
                                    <input name="image" id="image" type="file" className="hidden" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-between gap-y-10 w-1/2">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="font-bold font-mono">Nome do produto<span className="text-red-600">:</span></label>
                                    <input type="text" name="name" id="name" className="p-2 border-2 border-black rounded-sm font-bold text-red-600" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="description" className="font-bold font-mono">Descrição<span className="text-red-600">:</span></label>
                                    <textarea name="description" id="description" rows={5} className="p-2 border-2 border-black rounded-sm font-bold text-red-600"></textarea>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="quantity" className="font-bold font-mono">Estoque<span className="text-red-600">:</span></label>
                                    <input type="text" name="quantity" id="quantity" defaultValue={1} min={1} max={99} className="p-2 border-2 border-black rounded-sm font-bold text-red-600" />
                                </div>
                            </div>
                        </form>
                    </div>

                </main>
            <Footer />
        </>
    )
}