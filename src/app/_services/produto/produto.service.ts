import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IprodutoInput} from 'src/app/_interfaces/produto/iproduto-input';
import {IprodutoOutput} from 'src/app/_interfaces/produto/iproduto-output';
import {API_BASE} from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ProdutoService {

    constructor(private http : HttpClient) {}

    save(produto : IprodutoInput): Observable < IprodutoInput > {
        return this.http.post<IprodutoInput>(`${API_BASE}/produto`, produto);
    }

    update(produto : IprodutoInput): Observable < IprodutoInput > {
        return this.http.put<IprodutoInput>(`${API_BASE}/produto/${
            produto.id
        }`, produto);
    }

    delete(id : string): Observable < boolean > {
        return this.http.delete<boolean>(`${API_BASE}/produto/${
            id
        }`);
    }

    getAll(): Observable < IprodutoOutput[]> {
        return this.http.get<IprodutoOutput[]>(`${API_BASE}/produto`);
    }

    getById(id : string): Observable < IprodutoOutput > {
        return this.http.get<IprodutoOutput>(`${API_BASE}/produto/${id}`);
    }

    findProdutoPorCodigo(codigo: string): Observable <IprodutoOutput> {
        return this.http.get<IprodutoOutput>(`${API_BASE}/produto/findProdutoPorCodigo?codigo=${codigo}`);
    }

    getProximoCodigoLivre(): Observable <number> {
       return this.http.get<number>(`${API_BASE}/produto/getProximoCodigoLivre`);
    }

}
