import { IprodutoOutput } from "../produto/iproduto-output";

export interface IPedido {
    id?: string;
    produtos?:  IprodutoOutput[];
    nomeCliente: string;
    valorTotal: number;
    descontoTotal: number;
    status: string;
    metodoPagamento: string;
    doacao: boolean;
    fiado: boolean;
    evento: string;
}


