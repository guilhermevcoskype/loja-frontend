import { Component, inject, OnDestroy, OnInit, effect } from '@angular/core';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto.service';
import { BuscaService } from '../service/busca.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProdutosComponent } from '../produtos/produtos.component';
import { LowerCasePipe } from '@angular/common';


@Component({
  selector: 'app-busca-produto',
  standalone: true,
  imports: [ProdutosComponent, NgxPaginationModule, LowerCasePipe],
  templateUrl: './busca-produto.component.html',
  styleUrls: ['./busca-produto.component.css']
})
export class BuscaProdutoComponent implements OnInit {
  private produtoService = inject(ProdutoService);
  protected buscaService = inject(BuscaService);

  listProdutos: Produto[] = [];
  paginaAtual = 1;
  totalProdutos = 0;
  itemsPerPage = 0;

  constructor() {
    // O effect reage automaticamente sempre que o termo ou tipo mudar no serviço
    effect(() => {
      const termo = this.buscaService.termoBusca();
      const tipo = this.buscaService.tipoBusca();
      
      this.paginaAtual = 1; // Reseta a página ao mudar o filtro
      
      if (tipo) {
        this.buscarPorTipo();
      } else {
        this.buscarPorTexto();
      }
    });
  }

  ngOnInit(): void {}

  buscarPorTexto() {
    this.produtoService.buscarProduto(this.buscaService.termoBusca(), this.paginaAtual - 1)
      .subscribe({
        next: (page) => this.mapearPagina(page),
        error: (err) => console.error(err)
      });
  }

  buscarPorTipo() {
    this.produtoService.buscarProdutoPorTipo(this.buscaService.tipoBusca(), this.paginaAtual - 1)
      .subscribe({
        next: (page) => this.mapearPagina(page),
        error: (err) => console.error(err)
      });
  }

  private mapearPagina(page: any) {
    this.listProdutos = page.content;
    this.totalProdutos = page.totalElements;
    this.itemsPerPage = page.size;
  }

  handlePageChange(event: number): void {
    this.paginaAtual = event;
    if (this.buscaService.tipoBusca()) {
      this.buscarPorTipo();
    } else {
      this.buscarPorTexto();
    }
    window.scrollTo(0, 0);
  }
}