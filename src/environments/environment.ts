import { SweetAlertIcon } from "sweetalert2";

export const environment = {
  production: false,
  apiBaseURL: 'http://localhost:8001/api/',
  clientId: 'b5ba8562-289a-11ed-a261-0242ac120002',
  clientSecret: 'c7d119e6-7503-4693-8f92-0163f48cac49',
  tokenUrl: 'oauth/token'
};

//Trocar para URL do Endpoint
export const API_BASE = "http://localhost:8001/api/";

//Alerts
export const INFO = <SweetAlertIcon>'info';
export const SUCCESS = <SweetAlertIcon>'success';
export const ERROR = <SweetAlertIcon>'error';
export const WARNING = <SweetAlertIcon>'warning';
export const QUESTION = <SweetAlertIcon>'question';

//Rotas
export const ROTA_LISTA_CATEGORIAS = "../pdv/categoria/listar";
export const ROTA_ATUALIZA_CATEGORIA = "../pdv/categoria/atualizar";
export const ROTA_CADASTRA_CATEGORIA = "../pdv/categoria/cadastrar";

export const ROTA_LISTA_PRODUTOS = "../pdv/produto/listar";
export const ROTA_ATUALIZA_PRODUTO = "../pdv/produto/atualizar";
export const ROTA_CADASTRA_PRODUTO = "../pdv/produto/cadastrar";

