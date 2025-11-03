import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/conteudo/model/produto';
import { CarrinhoItem } from '../model/carrinhoItem';
import { CarrinhoService } from '../service/carrinho.service';
import { EllipsifyPipe } from '../../shared/ellipsify.pipe';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.component.html',
    styleUrls: ['./produtos.component.css'],
    standalone: true,
    imports: [
        UpperCasePipe,
        CurrencyPipe,
        EllipsifyPipe,
    ],
})

export class ProdutosComponent {
  @Input() produto: Produto = {
    id: 0,

    descricao: "",

    estoque: 0,

    preco: 0,

    dataInsercao: new Date(),

    urlImagem: "",

    tipoProduto: ""
  };

  constructor(private carrinhoService: CarrinhoService,
    private router: Router){
  }

  addCarrinho(){
    this.carrinhoService.aumentarQuantidadeItem(new CarrinhoItem(this.produto, 0));
    this.router.navigate(['/conteudo/carrinho']);
  }
}
