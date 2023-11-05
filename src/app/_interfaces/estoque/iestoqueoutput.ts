import { IprodutoOutput } from "../produto/iproduto-output";

export interface Iestoqueoutput {
    id: string;
    quantidade: number;
    idProduto: string;
    produtoNome?: string;
    produtoTamanho?: string;
}
