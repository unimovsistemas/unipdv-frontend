import { IprodutoOutput } from "../produto/iproduto-output";

export interface IHistorico {
    id: string;
    produtos: IprodutoOutput[];
    valorTotal: number;
    descontoTotal: number;
    status: string;
    metodoPagamento: string;
    motivo: string;
    evento: string;
    vendedor: string;
    dataHora: string;
}
