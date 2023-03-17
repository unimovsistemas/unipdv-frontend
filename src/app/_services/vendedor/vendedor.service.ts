import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVendedor } from 'src/app/_interfaces/vendedor/i-vendedor';
import { API_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  constructor(private http : HttpClient) {}

  save(vendedor : IVendedor): Observable < IVendedor > {
      return this.http.post<IVendedor>(`${API_BASE}/vendedor`, vendedor);
  }

  update(vendedor : IVendedor): Observable < IVendedor > {
      return this.http.put<IVendedor>(`${API_BASE}/vendedor/${
        vendedor.id
      }`, vendedor);
  }

  delete(id : string): Observable < boolean > {
      return this.http.delete<boolean>(`${API_BASE}/vendedor/${
          id
      }`);
  }

  getAll(): Observable < IVendedor[]> {
      return this.http.get<IVendedor[]>(`${API_BASE}/vendedor`);
  }

  getById(id : string): Observable < IVendedor > {
      return this.http.get<IVendedor>(`${API_BASE}/vendedor/${id}`);
  }

}
