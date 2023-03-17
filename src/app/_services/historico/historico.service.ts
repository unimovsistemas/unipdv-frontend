import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHistorico } from 'src/app/_interfaces/historico/i-historico';
import { API_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  constructor(private httpClient : HttpClient) { }

  getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${API_BASE}/historico`)
  }

  getById(id : string): Observable <any> {
    return this.httpClient.get<any>(`${API_BASE}/historico/${id}`)
  }

  getTotalVendasPorVendedor(id : string): Observable < number > {
    return this.httpClient.get<number>(`${API_BASE}/historico/getTotalVendasPorVendedor/${id}`)
}
}
