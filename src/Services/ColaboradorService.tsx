import FiltroPesquisa from "../Interfaces/Basic/FiltroPesquisa";
import IRecuperaLista from "../Interfaces/Basic/IRecuperaLista";
import IColaborador from "../Interfaces/IColaborador";
import api from "./Api";

class ColaboradorService {

    public async paginar(filtros: FiltroPesquisa): Promise<IRecuperaLista<IColaborador>> {

        let query = `${filtros.pagina}/${filtros.quantidade}?`

        if (filtros.nome) query += `nome=${filtros.nome}`;

        let { data: result } = await api.get<IRecuperaLista<IColaborador>>(`Pessoa/paginar/${query}`);

        return result;
    }

    public async salvar(Colaborador: IColaborador): Promise<IColaborador> {

        let { data: result } = await api.post<IColaborador>(`Pessoa`, Colaborador);

        return result;
    }

    public async ativar(id: number): Promise<void> {
        await api.put<number>(`Pessoa/${id}/ativar`);
    }

    public async inativar(id: number): Promise<void> {
        await api.put<number>(`Pessoa/${id}/inativar`);
    }
}

export default new ColaboradorService();