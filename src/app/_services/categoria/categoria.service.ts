import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IcategoriaInput} from 'src/app/_interfaces/categoria/icategoria-input';
import {IcategoriaOutput} from 'src/app/_interfaces/categoria/icategoria-output';
import {API_BASE} from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class CategoriaService {

    constructor(private http : HttpClient) {}

    save(categoria : IcategoriaInput): Observable < IcategoriaInput > {
        return this.http.post<IcategoriaInput>(`${API_BASE}/categoria`, categoria);
    }

    update(categoria : IcategoriaInput): Observable < IcategoriaInput > {
        return this.http.put<IcategoriaInput>(`${API_BASE}/categoria/${
            categoria.id
        }`, categoria);
    }

    delete(id : string): Observable < boolean > {
        return this.http.delete<boolean>(`${API_BASE}/categoria/${
            id
        }`);
    }

    getAll(): Observable < IcategoriaOutput[]> {
        return this.http.get<IcategoriaOutput[]>(`${API_BASE}/categoria`);
    }

    getById(id : string): Observable < IcategoriaOutput > {
        return this.http.get<IcategoriaOutput>(`${API_BASE}/categoria/${id}`);
    }

}
