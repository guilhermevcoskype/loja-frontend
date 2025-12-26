import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/conteudo/model/produto';
import { CarrinhoItem } from '../model/carrinhoItem';
import { CarrinhoService } from '../service/carrinho.service';
import { EllipsifyPipe } from '../../shared/ellipsify.pipe';
import { CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CurrencyPipe, EllipsifyPipe, FontAwesomeModule],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  private carrinhoService = inject(CarrinhoService);
  private router = inject(Router);

  @Input({ required: true }) produto!: Produto;
  
  faCartPlus = faCartPlus;

  addCarrinho() {
    this.carrinhoService.aumentarQuantidadeItem(new CarrinhoItem(this.produto, 0));
    this.router.navigate(['/conteudo/carrinho']);
  }
}