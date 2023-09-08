import { CarrinhoItem } from './carrinhoItem';
import { Produto } from './produto';

export class Carrinho {
  private itens = new Map<CarrinhoItem, number>();

  add(item: CarrinhoItem) {
    this.itens.set(item, this.getQuantidade(item)! + 1);
  }

  getQuantidade(item: CarrinhoItem) {
    /* if (!itens.containsKey(item)) {
          itens.put(item, 0);
      }
      return itens.get(item); */
    if (!this.itens.has(item)) {
      this.itens.set(item, 0);
    }
    return this.itens.get(item);
  }

 /*  aumentaQuantidade(produto: Produto) {
      // CarrinhoItem item = new CarrinhoItem(dadosProduto);
      let item = new CarrinhoItem(produto);
      if (this.itens.get(item) < 10)
          this.add(item);
  }

   reduzQuantidade(codigo: number) {
      DadosProduto dadosProduto = produtoService.buscarProdutoPorCodigo(codigo);
      CarrinhoItem item = new CarrinhoItem(dadosProduto);
      if (itens.get(item) > 1)
          itens.put(item, itens.get(item) - 1);
  } */

  /* removercodigo: number) {
      DadosProduto dadosProduto = produtoService.buscarProdutoPorCodigo(codigo);
      itens.remove(new CarrinhoItem(dadosProduto));
  } */

  removerTodos() {
    this.itens.clear();
  }

  /* getQuantidade() { // criado pra retornar a pagina o numero de itens existentes no carrinho
      return this.itens.values().stream().reduce(0, (proximo, acumulador) -> (proximo + acumulador));
  } */

  getQuantidadeTotal(): number {
    let total = 0;
    for (const quantidade of this.itens.values()) {
      total += quantidade;
    }
    return total;
  }

  getItens() {
    return this.itens.keys();
  }

  getTotal(item: CarrinhoItem) {
    return item.getPrecoTotal(this.getQuantidade(item)!);
  }

  getTotalSemParam() {
    /* for (CarrinhoItem item : itens.keySet()) {
          total = total.add(getTotal(item));
      } */
    let total = 0;
    for (const item of this.itens.keys()) {
      total += this.getTotal(item);
    }
    return total;
  }

  getTotalFormatado() {
    let total = 0;
    for (const item of this.itens.keys()) {
      total += this.getTotal(item);
    }
    return total;
  }
}
