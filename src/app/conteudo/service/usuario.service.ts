import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Usuario } from '../model/usuario';
import { RequestToken } from '../model/requestToken';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private environmentApi: string = environment.apiUrl + '/';

  constructor(private httpClient: HttpClient) {}

  logar(usuario: Usuario): Observable<RequestToken> {
    return this.httpClient
      .post<RequestToken>(this.environmentApi+"login", usuario)
      .pipe(take(1));
  }

  cadastrarUsuario(usuario: Usuario) {
    return this.httpClient.post(this.environmentApi+'usuario', usuario).pipe(take(1));
  }
}
