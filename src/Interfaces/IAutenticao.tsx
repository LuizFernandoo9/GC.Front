export default interface IAutenticacao {
    token: string;
    usuario: IUsuario;
}

interface IUsuario {
    id: number,
    email: string,
    nome: string,
    empresaId: number,
    permissao: number,
    status:number,
    tipo:number,
}