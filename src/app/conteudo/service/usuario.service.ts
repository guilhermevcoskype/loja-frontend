import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Usuario } from '../model/usuario';
import { RequestToken } from '../model/requestToken';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly API: string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  logar(usuario: Usuario): Observable<RequestToken> {
    return this.httpClient
      .post<RequestToken>(this.API+"login", usuario)
      .pipe(take(1));
  }

  cadastrarUsuario(usuario: Usuario) {
    return this.httpClient.post(this.API+'usuario', usuario).pipe(take(1));
  }
}
