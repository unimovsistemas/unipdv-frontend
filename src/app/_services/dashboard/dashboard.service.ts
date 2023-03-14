import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from 'src/environments/environment';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }

  public getTotalProdutosCadastrados(): Observable<number> {
    return this.http.get<number>(`${API_BASE}/produto/getTotalProdutosCadastrados`);
  }

  public getTotalProdutosComSaldoEstoque(): Observable<number> {
    return this.http.get<number>(`${API_BASE}/estoque/getTotalProdutosComSaldoEstoque`);
  }

  public getTotalProdutosSemSaldoEstoque(): Observable<number> {
    return this.http.get<number>(`${API_BASE}/estoque/getTotalProdutosSemSaldoEstoque`);
  }

  public getTotalSaidasDoacao(): Observable<number> {
    return this.http.get<number>(`${API_BASE}/estoque/getTotalSaidasProdutoPorMotivo?motivoSaida=DOACAO`);
  }

  public getTotalSaidasQuebra(): Observable<number> {
    return this.http.get<number>(`${API_BASE}/estoque/getTotalSaidasProdutoPorMotivo?motivoSaida=QUEBRA`);
  }

  public getValorTotalVendas(): Observable<number> {
    return this.http.get<number>(`${API_BASE}/pedido/getValorTotalVendas`);
  }

  public getQuantidadeTotalVendas(): Observable<number> {
    return this.http.get<number>(`${API_BASE}/pedido/getQuantidadeTotalVendas`);
  }
}
