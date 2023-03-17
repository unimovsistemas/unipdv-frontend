import { IcategoriaOutput } from "../categoria/icategoria-output";
import { Iestoqueoutput } from "../estoque/iestoqueoutput";

export interface IprodutoOutput {
    id?: string;
    codigo: string;
    nome: string;
    descricao: string;
    preco: number;
    desconto: number;
    tamanho: string;
    categoria: IcategoriaOutput;
    estoque: Iestoqueoutput;
    pedidoQuantidade?: number;
}
