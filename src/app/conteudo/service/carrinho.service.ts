import { Injectable } from '@angular/core';
import { CarrinhoItem } from '../model/carrinhoItem';
import { ProdutoService } from './produto.service';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  mapItens = new Map<CarrinhoItem, number>();

  constructor(private produtoService: ProdutoService) {}

  add(item: CarrinhoItem) {
    this.mapItens.set(item, this.getQuantidade(item)! + 1);
  }

  getQuantidade(item: CarrinhoItem) {
    /* if (!itens.containsKey(item)) {
          itens.put(item, 0);
      }
      return itens.get(item); */
    if (!this.mapItens.has(item)) {
      this.mapItens.set(item, 0);
    }
    return this.mapItens.get(item);
  }

  aumentaQuantidade(id: number) {
    // CarrinhoItem item = new CarrinhoItem(dadosProduto);
    this.produtoService.buscarProdutoPorCodigo(id).subscribe({
      next: (produtoRetornado) => {
        let item = new CarrinhoItem(produtoRetornado);
        if (this.mapItens.get(item)! < 10) this.add(item);
      },
      error: (erro) => {
        console.log('houve um erro de requisição');
      },
    });
  }

  reduzQuantidade(id: number) {
    this.produtoService.buscarProdutoPorCodigo(id).subscribe({
      next: (produtoRetornado) => {
        let item = new CarrinhoItem(produtoRetornado);
        if (this.mapItens.get(item)! > 1)
          this.mapItens.set(item, this.mapItens.get(item)! - 1);
      },
      error: (erro) => {
        console.log('houve um erro de requisição');
      },
    });
  }

  remover(id: number) {
    this.produtoService.buscarProdutoPorCodigo(id).subscribe({
      next: (produtoRetornado) => {
        this.mapItens.delete(new CarrinhoItem(produtoRetornado));
      },
      error: (erro) => {
        console.log('houve um erro de requisição');
      },
    });
  }

  removerTodos() {
    this.mapItens.clear();
  }

  /* getQuantidade() { // criado pra retornar a pagina o numero de itens existentes no carrinho
      return this.itens.values().stream().reduce(0, (proximo, acumulador) -> (proximo + acumulador));
  } */

  getQuantidadeTotal(): number {
    let total = 0;
    for (const quantidade of this.mapItens.values()) {
      total += quantidade;
    }
    return total;
  }

  getItens() {
    return this.mapItens.keys();
  }

  getTotal(item: CarrinhoItem) {
    return item.getTotal(this.getQuantidade(item)!);
  }

  getTotalSemParam() {
    /* for (CarrinhoItem item : itens.keySet()) {
          total = total.add(getTotal(item));
      } */
    let total = 0;
    for (const item of this.mapItens.keys()) {
      total += this.getTotal(item);
    }
    return total;
  }

  getTotalFormatado() {
    let total = 0;
    for (const item of this.mapItens.keys()) {
      total += this.getTotal(item);
    }
    return total;
  }
}
