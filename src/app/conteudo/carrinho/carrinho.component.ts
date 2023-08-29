import { Component, OnDestroy, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto.service';
import { CarrinhoItem } from '../model/carrinhoItem';
import { CarrinhoService } from '../service/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit, OnDestroy {

  carrinho : CarrinhoService;
  mapItensKeys!: CarrinhoItem[];


  constructor(private carrinhoService: CarrinhoService) {
    this.carrinho = carrinhoService;
    this.mapItensKeys = Array.from(this.carrinho.mapItens.keys());
  }
  ngOnInit(): void {
    console.log(this.mapItensKeys);
    console.log(this.carrinho);
  }

  ngOnDestroy(): void {
    console.log(this.mapItensKeys);
    console.log(this.carrinho);
  }

  aumentarQuantidadeItem(item: CarrinhoItem) {
    this.carrinho.aumentarQuantidadeItem(item);
    this.mapItensKeys = Array.from(this.carrinho.mapItens.keys());
  }

  diminuirQuantidadeItem(item: CarrinhoItem) {
    this.carrinho.getQuantidadeItem(item)! > 1
        ? this.carrinho.diminuirQuantidadeItem(item)
        : this.carrinho.removerItem(item);
    this.mapItensKeys = Array.from(this.carrinho.mapItens.keys());
  }

  removerItem(item: CarrinhoItem) {
    this.carrinho.removerItem(item);
    this.mapItensKeys = Array.from(this.carrinho.mapItens.keys());
  }
}
