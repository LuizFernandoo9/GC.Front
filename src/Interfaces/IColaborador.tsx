import { DateTime } from "../Components/Charts/ApexChart/ChartFunction/apexchart";

export default interface ISetor {
  id: number;
  status:number;
  nome:string;
  enderecoId: number;
  documento: string;
  habilitacao: string;
  sexo: string;
  dataNascimento: null | Date;
  telefone1: string;
  telefone2: string;
  email: string;
  nomeTitularConta: string;
  conta: string;
  agencia: string;
  pix: string;
}