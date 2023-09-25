export default interface PaginationRequest{
    pagina: number,
    quantidade: number, 
    sort: string,
    totalItems: number;
    totalPaginas: number;
}