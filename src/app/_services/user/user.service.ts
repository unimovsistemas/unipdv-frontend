import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IUsuario} from 'src/app/_interfaces/usuario/i-usuario';
import {API_BASE} from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class UserService {

    constructor(private httpClient : HttpClient) {}

    save(usuario : IUsuario): Observable < IUsuario > {
        return this.httpClient.post<IUsuario>(`${API_BASE}/usuario`, usuario);
    }

    update(usuario : IUsuario): Observable < IUsuario > {
        return this.httpClient.put<IUsuario>(`${API_BASE}/usuario/${
            usuario.id
        }`, usuario);
    }

    delete(id : string): Observable < boolean > {
        return this.httpClient.delete<boolean>(`${API_BASE}/usuario/${
            id
        }`);
    }

    getAll(): Observable < IUsuario[] > {
        return this.httpClient.get<IUsuario[]>(`${API_BASE}/usuario`);
    }

    getById(id : string): Observable < IUsuario > {
        return this.httpClient.get<IUsuario>(`${API_BASE}/usuario/${id}`);
    }

}
