import { SweetAlertIcon } from "sweetalert2";

export const environment = {
  production: false,
  apiBaseURL: 'http://192.168.8.111:8001/api/',
  tokenUrl:"",
  clientId:"",
  clientSecret:""
};

//Trocar para URL do Endpoint
export const API_BASE = "http://192.168.8.111:8001/api/";

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
export const ROTA_LISTA_PEDIDOS = "../pdv/pedido/listar";
export const ROTA_ATUALIZA_PRODUTO = "../pdv/produto/atualizar";
export const ROTA_CADASTRA_PRODUTO = "../pdv/produto/cadastrar";

