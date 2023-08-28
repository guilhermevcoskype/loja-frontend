import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class BuscaService {

  private buscaSource = new BehaviorSubject<string>('');
  busca = this.buscaSource.asObservable();

  constructor() { }

  setBusca(busca: string, router: Router){
    this.buscaSource.next(busca);
    router.navigate(['/conteudo/buscaProduto'], { state: { busca }, onSameUrlNavigation: 'reload' });
  }
}
