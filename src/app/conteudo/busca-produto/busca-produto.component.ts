import { Component, OnDestroy, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../service/produto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from 'src/app/shared/componentes/message-modal/message-modal.component';
import { BuscaService } from '../service/busca.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-busca-produto',
  templateUrl: './busca-produto.component.html',
  styleUrls: ['./busca-produto.component.css'],
})
export class BuscaProdutoComponent implements OnInit, OnDestroy {
  listProdutos: Produto[] = [];
  busca: string = ""
  private modalService!: NgbModal;
  produtoSubscription!: Subscription;

  paginaAtual: number = 1;
  itemsPerPage: number = 0;
  totalProdutos: number = 0;
  currentIndex = -1;

  constructor(
    private route: ActivatedRoute,
    private readonly produtoService: ProdutoService,
    private buscaService: BuscaService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.busca = history.state.busca;
    });
  }

  buscarProduto() {
    this.produtoSubscription = this.produtoService
      .buscarProduto(this.busca, this.paginaAtual)
      .subscribe({
        next: (page) => {
          this.listProdutos = page.content;
          this.totalProdutos = page.totalElements;
          this.itemsPerPage = page.size;
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  buscarPorTipoProduto() {
    this.produtoSubscription = this.produtoService
      .buscarProdutoPorTipo(this.busca, this.paginaAtual)
      .subscribe({
        next: (page) => {
          this.listProdutos = page.content;
          this.totalProdutos = page.totalElements;
          this.itemsPerPage = page.size;
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.produtoSubscription) this.produtoSubscription.unsubscribe();
  }

  openModal(message: string, titulo: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.titulo = titulo;
  }

  handlePageChange(event: number): void {
    this.paginaAtual = event;
    this.buscarProduto();
  }

  ngOnInit(): void {
    this.buscaService.busca.subscribe({
      next: (response) => {
        this.busca = response;
        this.buscarProduto();
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.buscaService.buscaTipoProduto.subscribe({
      next: (response) => {
        this.busca = response;
        this.buscarPorTipoProduto();
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.buscarProduto();
  }
}
