import { Injectable } from '@angular/core';
import { DadoToken } from '../model/dadoToken';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token!: DadoToken;
  private nomeSource = new BehaviorSubject<string>('');
  nome = this.nomeSource.asObservable();

  setToken(token: DadoToken) {
    this.token = token;
  }

  resetToken(){
    this.token.token = "";
  }

  getToken() {
    return this.token;
  }

  setNome(nome: string){
    this.nomeSource.next(nome);
  }

  getNome(){
    return this.nome;
  }
}
