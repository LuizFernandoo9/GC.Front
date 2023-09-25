import FiltroPesquisa from "../Interfaces/Basic/FiltroPesquisa";
import IRecuperaLista from "../Interfaces/Basic/IRecuperaLista";
import ICargo from "../Interfaces/ICargo";
import api from "./Api";

class CargoService {

    public async paginar(filtros: FiltroPesquisa): Promise<IRecuperaLista<ICargo>> {

        let query = `${filtros.pagina}/${filtros.quantidade}?`

        if (filtros.nome) query += `nome=${filtros.nome}`;

        let { data: result } = await api.get<IRecuperaLista<ICargo>>(`Cargo/paginar/${query}`);

        return result;
    }

    public async salvar(Cargo: ICargo): Promise<ICargo> {

        let { data: result } = await api.post<ICargo>(`Cargo`, Cargo);

        return result;
    }

    public async ativar(id: number): Promise<void> {
        await api.put<number>(`Cargo/${id}/ativar`);
    }

    public async inativar(id: number): Promise<void> {
        await api.put<number>(`Cargo/${id}/inativar`);
    }
}

export default new CargoService();