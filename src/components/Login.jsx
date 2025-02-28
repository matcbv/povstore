export function Login(){
    return (
        <div className="flex flex-col items-start gap-y-6">
            <div className="flex w-full gap-x-4">
                <input type="submit" value="Entrar" className="border border-black py-1 rounded w-full cursor-pointer hover:font-bold" />
                <button type="button"><img src="/assets/images/google.png" alt="Login com o Google" /></button>
            </div>
            <input type="button" value="Esqueci minha senha" className="cursor-pointer" />
        </div>
    );
};
