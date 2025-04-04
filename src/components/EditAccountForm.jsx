export function EditAccountForm(){

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <form onSubmit={ handleSubmit }>
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="">Senha</label>
            <input type="password" name="password" id="password" />
            <label htmlFor="phoneNumber">Número de telefone</label>
            <input type="tel" name="phoneNumber" id="phoneNumber" />
            <label htmlFor=""></label>
        </form>
    );
};
