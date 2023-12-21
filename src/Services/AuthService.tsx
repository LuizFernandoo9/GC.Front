import IAutenticacao from "../Interfaces/IAutenticao";
import api from "./Api";

class AuthService {

    async loginColaborador(email: string, senha: string): Promise<IAutenticacao> {
        let { data: result } = await api.post<IAutenticacao>('Autenticacao/loginColaborador', { email, senha });
        return result;
    }
    async loginPaciente(email: string, senha: string): Promise<IAutenticacao> {
        let { data: result } = await api.post<IAutenticacao>('Autenticacao/loginPaciente', { email, senha });
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