import { Produto } from './produto';

export class CarrinhoItem {
  produto: Produto = new Produto();

  constructor(produto: Produto) {
    this.produto = produto;
  }

  getTotal(quantidade: number) {
    return Number(this.produto.preco) * quantidade;
  }

  getTotalFormatado(quantidade: number) {
    return Number(this.produto.preco) * quantidade;
  }
}
