import { IcategoriaOutput } from "../categoria/icategoria-output";

export interface IprodutoOutput {
    id?: string;
    codigo: string;
    nome: string;
    descricao: string;
    preco: number;
    desconto: number;
    tamanho: string;
    categoria: IcategoriaOutput;
    estoque: {
        id?: string;
        quantidade: number;
    };
}
