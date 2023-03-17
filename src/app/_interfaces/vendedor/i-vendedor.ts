import { IUsuario } from "../usuario/i-usuario";

export interface IVendedor {
    id?: string;
    nome: string;
    celular: string;
    email: string;
    cpf: string;
    congregacao: string;
    usuario: IUsuario;
    qtdVendas?: number;
    autor: string;
}
