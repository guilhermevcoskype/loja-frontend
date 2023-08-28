import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto.service';
import { CarrinhoItem } from '../model/carrinhoItem';
import { CarrinhoService } from '../service/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {

  mapItens = new Map<CarrinhoItem, number>();
  carrinho : CarrinhoService;


  constructor(private carrinhoService: CarrinhoService) {
    this.mapItens = carrinhoService.mapItens;
    this.carrinho = carrinhoService;
  }
  ngOnInit(): void {}

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

  getQuantidadeTotal(): number {
    let total = 0;
    for (const quantidade of this.mapItens.values()) {
      total += quantidade;
    }
    return total;
  }
}
