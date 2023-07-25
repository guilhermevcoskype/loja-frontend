import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API: string = 'http://localhost:8080/login'

  constructor(private httpClient: HttpClient) { }

  getUsuario(){

  }

  getLogin(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.get(this.API+'/'+usuario).pipe((response: any) => response)
  }
}
