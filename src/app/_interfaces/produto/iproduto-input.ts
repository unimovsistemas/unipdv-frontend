export interface IprodutoInput {
  id?: string,
  codigo: string;
  nome: string;
  descricao: string;
  preco: number;
  desconto: number;
  tamanho: string;
  idCategoria: string;
  estoque: {
    quantidade: number;
  };
  autor: string;
}
