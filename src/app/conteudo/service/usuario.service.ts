import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly API: string = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) {}

  logar(usuario: Usuario): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    });
    const options = { headers: headers };
    return this.httpClient
      .post<string>(this.API+"login", usuario, options)
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
