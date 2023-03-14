import {
    HttpClient
}
from '@angular/common/http';
import {
    Injectable
}
from '@angular/core';
import {
    Observable
}
from 'rxjs';
import { IbaixaManual } from 'src/app/_interfaces/estoque/ibaixa-manual';
import {
    Iestoqueoutput
}
from 'src/app/_interfaces/estoque/iestoqueoutput';
import {
    API_BASE
}
from 'src/environments/environment';

@Injectable({ providedIn: 'root' }) export class EstoqueService {

    constructor(private http : HttpClient) {}

    baixaManual(listBaixaManual : IbaixaManual[]): Observable < any > {
      return this.http.post<any>(`${API_BASE}/estoque/baixaManualEstoque`, listBaixaManual);
  }

    getAll():Observable < Iestoqueoutput[] > {
        return this.http.get<Iestoqueoutput[]>(`${API_BASE}/estoque`);
    }

    getById(id : string):Observable < Iestoqueoutput > {
        return this.http.get<Iestoqueoutput>(`${API_BASE}/estoque / ${id}`);
    }

}
