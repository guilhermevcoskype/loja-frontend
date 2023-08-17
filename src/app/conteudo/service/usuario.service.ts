import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Usuario } from '../model/usuario';
import { Token } from '@angular/compiler';
import { DadoToken } from '../model/dadoToken';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly API: string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  logar(usuario: Usuario): Observable<DadoToken> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    });
    const options = { headers: headers };
    return this.httpClient
      .post<DadoToken>(this.API+"login", usuario, options)
      .pipe(take(1));
  }

  cadastrarUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    });
    const options = { headers: headers };
    return this.httpClient.post(this.API+'usuario', usuario, options).pipe(take(1));
  }
}
