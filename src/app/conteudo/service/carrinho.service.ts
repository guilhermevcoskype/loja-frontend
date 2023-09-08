import { Injectable } from '@angular/core';
import { CarrinhoItem } from '../model/carrinhoItem';
import { ProdutoService } from './produto.service';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  carrinhoItens: CarrinhoItem[] = [];

  constructor(private produtoService: ProdutoService) {
    const dados = sessionStorage.getItem('itens');
    if (dados !== null) {
      const objetos = JSON.parse(dados);
      this.carrinhoItens = objetos.map((obj: any) =>
        CarrinhoItem.fromObject(obj)
      );
    }
  }

  getQuantidadeItem(item: CarrinhoItem) {
    const index = this.verificarExistencia(item);
    if (index > -1) {
      return this.carrinhoItens.find(
        (itemProcurado) => itemProcurado.produto.id === item.produto.id
      )?.quantidade;
    }
    return 0;
  }

  getQuantidadeTotal(): number {
    let total = 0;
    this.carrinhoItens.forEach((item) => (total += item.quantidade));
    return total;
  }

  getPrecoTotal() {
    let total = 0;
    this.carrinhoItens.forEach((item) => {
      total += item.getPrecoTotal(this.getQuantidadeItem(item));
    });
    return total;
  }

  aumentarQuantidadeItem(item: CarrinhoItem) {
    const index = this.verificarExistencia(item);
    if (index > -1) {
      const itemAtual = this.carrinhoItens[this.carrinhoItens.indexOf(item)];
      itemAtual?.setQuantidade(itemAtual.quantidade + 1);
      this.carrinhoItens[this.carrinhoItens.indexOf(item)] = itemAtual;
    } else {
      item.setQuantidade(item.quantidade + 1);
      this.carrinhoItens.push(item);
    }
    this.armazenarDados();
  }

  diminuirQuantidadeItem(item: CarrinhoItem) {
    const index = this.verificarExistencia(item);
    if (index > -1) {
      const itemAtual = this.carrinhoItens[this.carrinhoItens.indexOf(item)];
      itemAtual?.setQuantidade(itemAtual.quantidade - 1);
      this.carrinhoItens[this.carrinhoItens.indexOf(item)] = itemAtual;
    } else this.removerItem(item);
    this.armazenarDados();
  }

  removerItem(item: CarrinhoItem) {
    const index = this.verificarExistencia(item);
    if (index > -1) {
      this.carrinhoItens.splice(this.carrinhoItens.indexOf(item), 1);
    }
    this.armazenarDados();
  }

  verificarExistencia(item: CarrinhoItem): number {
    return this.carrinhoItens.findIndex(
      (itemProcurado) => itemProcurado.produto.id === item.produto.id
    );
  }

  private armazenarDados() {
    sessionStorage.setItem('itens', JSON.stringify(this.carrinhoItens));
  }
}
