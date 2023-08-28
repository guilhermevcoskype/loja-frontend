import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/produto';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../service/produto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from 'src/app/shared/componentes/message-modal/message-modal.component';
import { BuscaService } from '../service/busca.service';

@Component({
  selector: 'app-busca-produto',
  templateUrl: './busca-produto.component.html',
  styleUrls: ['./busca-produto.component.css'],
})
export class BuscaProdutoComponent implements OnInit {
  listProdutos!: Produto[];
  busca: string = '';
  private modalService!: NgbModal;

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
    this.produtoService.buscarProduto(this.busca, this.paginaAtual).subscribe({
      next: (page) => {
        this.listProdutos = page.content;
        this.totalProdutos = page.totalElements;
        this.itemsPerPage = page.size;
      },
      error: (erro) => {
        this.openModal('Ocorreu um erro ao realizar a busca, tente novamente.');
      },
    });
  }

  openModal(message: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
  }

  handlePageChange(event: number): void {
    this.paginaAtual = event;
    this.buscarProduto();
  }

  ngOnInit(): void {
    this.buscaService.busca.subscribe({
      next: (response) => {this.busca = response; this.buscarProduto()},
      error: (error) => {console.log('ocorreu um erro')}
    });
    this.buscarProduto();
  }
}
