import IAutenticacao from "../Interfaces/IAutenticao";
import api from "./Api";

class AuthService {

    async signIn(email: string, senha: string): Promise<IAutenticacao> {
        let { data: result } = await api.post<IAutenticacao>('Autenticacao', { email, senha });
        return result;
    }

    async teste(): Promise<boolean> {
        let { data: result } = await api.get<any>('CentroCusto/Paginar/1/10');
        return result;
    }

    async resetPassword(email: string): Promise<void> {
        await api.put<IAutenticacao>('Usuario/ResetarSenha', { email });
    }

    async resetPasswordConfirmCode(email: string, codigoResetSenha: string): Promise<void> {
        await api.put<IAutenticacao>('Usuario/ConfirmaResetSenha', { email, codigoResetSenha });
    }

    async refreshToken(ip: string): Promise<IAutenticacao> {
        let { data: result } = await api.post<IAutenticacao>('Autenticacao/RefreshToken', {ip});

        return result;
    }
}


export default new AuthService();