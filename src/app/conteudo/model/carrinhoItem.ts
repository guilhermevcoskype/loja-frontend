import { Produto } from './produto';

export class CarrinhoItem {
  produto: Produto = new Produto();
  quantidade: number = 0;

  constructor(produto: Produto, quantidade: number) {
    this.produto = produto;
    this.quantidade = quantidade;
  }

  getPrecoTotal(quantidade?: number) {
    if (quantidade) return Number(this.produto.preco) * quantidade;
    else return 0;
  }

  setQuantidade(quantidade: number){
    this.quantidade = quantidade;
  }

  static fromObject(obj: any): CarrinhoItem {
    return new CarrinhoItem(obj.produto, obj.quantidade);
  }
}
