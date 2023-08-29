import { Injectable } from '@angular/core';
import { CarrinhoItem } from '../model/carrinhoItem';
import { ProdutoService } from './produto.service';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  mapItens = new Map<CarrinhoItem, number>();

  constructor(private produtoService: ProdutoService) {}

  getQuantidadeItem(item: CarrinhoItem) {
    if (!this.mapItens.has(item)) {
      return 0;
    }
    return this.mapItens.get(item);
  }

  getQuantidadeTotal(): number {
    let total = 0;
    for (const quantidade of this.mapItens.values()) {
      total += quantidade;
    }
    return total;
  }

  getPrecoTotal() {
    let total = 0;
    for (const item of this.mapItens.keys()) {
      total += item.getPrecoTotal(this.getQuantidadeItem(item));
    }
    return total;
  }

  aumentarQuantidadeItem(item: CarrinhoItem) {
    console.log(this.mapItens.has(item));
    if (this.mapItens.has(item)) {
      const quantidadeAtual = this.mapItens.get(item);
      this.removerItem(item);
      this.mapItens.set(item, quantidadeAtual! + 1);
    } else this.mapItens.set(item, this.getQuantidadeItem(item)! + 1);
  }

  diminuirQuantidadeItem(item: CarrinhoItem) {
    if (this.mapItens.has(item)) {
      this.mapItens.set(item, this.getQuantidadeItem(item)! - 1);
    }
  }

  removerItem(item: CarrinhoItem) {
    if (this.mapItens.has(item)) {
      this.mapItens.delete(item);
    }
  }
}
