import { Component, Input } from '@angular/core';
import { Produto } from 'src/app/conteudo/model/produto';
import { CarrinhoService } from '../service/carrinho.service';
import { CarrinhoItem } from '../model/carrinhoItem';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
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
    this.carrinhoService.add(new CarrinhoItem(this.produto));
    this.router.navigate(['/conteudo/carrinho']);
  }
}
