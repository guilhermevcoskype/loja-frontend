import { Injectable } from '@angular/core';
import { DadoToken, DadoToken as string } from '../model/dadoToken';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private token!: string;
  private nomeSource = new BehaviorSubject<DadoToken>(new DadoToken());
  nome = this.nomeSource.asObservable();

  setToken(token: string) {
    this.token = token;
  }

  resetToken() {
    this.token = '';
  }

  getToken() {
    return this.token;
  }

  setNome(nome: DadoToken) {
    this.nomeSource.next(nome);
  }

  getNome() {
    return this.nome;
  }
}
