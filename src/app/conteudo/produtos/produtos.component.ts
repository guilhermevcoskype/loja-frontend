import { Component, Input } from '@angular/core';
import { Produto } from 'src/app/conteudo/model/produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})

export class ProdutosComponent {
  @Input() produto: Produto = {
    id:0,
    nome: '',
    quantidade:0
  };
}
