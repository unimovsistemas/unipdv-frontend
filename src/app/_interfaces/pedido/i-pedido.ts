import { IprodutoOutput } from "../produto/iproduto-output";
import { IPedidoProduto } from "./i-pedido-produto";

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

export interface IPedidoInput {
    id?: string;
    pedidoProdutos?:  IPedidoProduto[];
    nomeCliente: string;
    percentualDescontoPedido?: number;
    valorDescontoPedido?: number;
    pedidoStatus: string;
    metodoPagamento: string;
    doacao: boolean;
    fiado: boolean;
    evento: string;
    autor: string;
}


