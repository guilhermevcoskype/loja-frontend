import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {
  // Signals para armazenar o termo e o tipo da busca
  termoBusca = signal<string>('');
  tipoBusca = signal<string>('');

  constructor(private router: Router) { }

  setBusca(busca: string) {
    this.termoBusca.set(busca);
    this.tipoBusca.set(''); // Limpa a busca por tipo ao fazer busca textual
    this.navegar();
  }

  setBuscaPorTipo(tipo: string) {
    this.tipoBusca.set(tipo);
    this.termoBusca.set(''); // Limpa a busca textual ao filtrar por tipo
    this.navegar();
  }

  private navegar() {
    this.router.navigate(['/conteudo/buscaProduto']);
  }
}