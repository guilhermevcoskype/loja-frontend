import { Injectable, signal, computed, inject } from '@angular/core';
import { DadoToken } from '../model/dadoToken';
import { CarrinhoService } from './carrinho.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Signal privado para armazenar os dados do usuário
  private usuarioLogado = signal<DadoToken | null>(null);

  // Signal público somente leitura
  readonly usuario = this.usuarioLogado.asReadonly();
  private carrinhoService = inject(CarrinhoService);

  // Computed signals para facilitar a vida
  readonly estaLogado = computed(() => !!this.usuarioLogado());
  readonly isAdmin = computed(() => this.usuarioLogado()?.roles?.includes('ADMIN') ?? false);

  constructor() {
    this.recuperarSessao();
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  setTokenDecodificado(dados: DadoToken) {
    sessionStorage.setItem('tokenDecodificado', JSON.stringify(dados));
    this.usuarioLogado.set(dados); // Atualiza o signal
  }

  private recuperarSessao() {
    const dados = sessionStorage.getItem('tokenDecodificado');
    if (dados) {
      this.usuarioLogado.set(JSON.parse(dados));
    }
  }

  logout() {
    sessionStorage.clear();
    this.carrinhoService.limparCarrinho();
    this.usuarioLogado.set(null);
  }
}