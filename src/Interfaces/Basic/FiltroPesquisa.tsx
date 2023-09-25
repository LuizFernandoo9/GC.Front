import PaginationRequest from "../Basic/PaginationRequest";

export default interface FiltroPesquisa extends PaginationRequest {
    nome: string;
    status: number;
}
