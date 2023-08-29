import { Produto } from './produto';

export class CarrinhoItem {
  produto: Produto = new Produto();

  constructor(produto: Produto) {
    this.produto = produto;
  }

  getPrecoTotal(quantidade?: number) {
    if (quantidade) return Number(this.produto.preco) * quantidade;
    else return 0;
  }
}
