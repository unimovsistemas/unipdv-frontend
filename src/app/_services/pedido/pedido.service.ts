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
import {
    IPedido, IPedidoInput
}
from 'src/app/_interfaces/pedido/i-pedido';
import {
    API_BASE
}
from 'src/environments/environment';

@Injectable({ providedIn: 'root' }) export class PedidoService {

    constructor(private httpClient: HttpClient) {}

    save(pedido : IPedidoInput):Observable < IPedido > {
        return this.httpClient.post<IPedido>(`${API_BASE}/pedido`, pedido);
    }

    update(pedido : IPedidoInput):Observable < IPedido > {
        return this.httpClient.put<IPedido>(`${API_BASE}/pedido/${ pedido.id }`, pedido);
    }

    delete(id : string):Observable < boolean > {
        return this.httpClient.delete<boolean>(`${API_BASE}/pedido/${ id }`);
    }

    getAll():Observable < IPedido[] > {
        return this.httpClient.get<IPedido[]>(`${API_BASE}/pedido`);
    }

    getById(id : string):Observable < IPedido > {
        return this.httpClient.get<IPedido>(`${API_BASE}/pedido / ${id}`);
    }

    findAllPedidoPorNomeCliente(nomeCliente : string): Observable <IPedido[]> {
        return this.httpClient.get<IPedido[]>(`${API_BASE}/pedido/findAllPedidoPorNomeCliente?nomeCliente=${nomeCliente}`);
    }

    concluirVenda(pedido : IPedidoInput):Observable < any > {
        return this.httpClient.put<any>(`${API_BASE}/pedido/concluirVenda/${ pedido.id }`, pedido);
    }
}
