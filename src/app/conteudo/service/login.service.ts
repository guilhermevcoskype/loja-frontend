import { Injectable } from '@angular/core';
import { DadoToken, DadoToken as string } from '../model/dadoToken';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private token!: string;
  private dadosTokenSource = new BehaviorSubject<DadoToken>(new DadoToken());
  tokenDecodificado$ = this.dadosTokenSource.asObservable();
  tokenDecodificado?: DadoToken;

  constructor() {
    this.recuperarToken();
    this.recuperarTokenDecodificado();

  }

  setToken(token: string) {
    this.token = token;
    sessionStorage.setItem('token', this.token);
  }

  resetToken() {
    this.token = '';
    sessionStorage.setItem('token', this.token);
  }

  getToken() {
    return this.token;
  }

  setTokenDecodificado(dadoToken: DadoToken) {
    this.dadosTokenSource.next(dadoToken);
    this.tokenDecodificado = dadoToken;
    sessionStorage.setItem(
      'tokenDecodificado',
      JSON.stringify(this.tokenDecodificado)
    );
  }

  recuperarToken(){
    const token = sessionStorage.getItem('token');
    if (token !== null) {
      this.token = token;
    }
  }

  recuperarTokenDecodificado(){
    const tokenDecodificado = sessionStorage.getItem('tokenDecodificado');
    if (tokenDecodificado !== null) {
      this.tokenDecodificado = JSON.parse(tokenDecodificado);
      this.dadosTokenSource.next(this.tokenDecodificado!);
    }
  }
}
