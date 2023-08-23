import { Component } from '@angular/core';
import { ProdutoService } from '../service/produto.service';
import { Produto } from 'src/app/conteudo/model/produto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from 'src/app/shared/componentes/message-modal/message-modal.component';

@Component({
  selector: 'app-u-lancamentos',
  templateUrl: './u-lancamentos.component.html',
  styleUrls: ['./u-lancamentos.component.css'],
})
export class ULancamentosComponent {
  listProdutos: Array<Produto> = [];
  paginaAtual: number = 1;
  itemsPerPage: number = 0;
  totalProdutos: number = 0;
  currentIndex = -1;

  constructor(
    private readonly produtoService: ProdutoService,
    private modalService: NgbModal
  ) {
    this.getListProdutos();
  }

  getListProdutos() {
    return this.produtoService.getListProdutos(this.paginaAtual).subscribe({
      next: (page) => {
        console.log(page);
        this.listProdutos = page.content;
        this.totalProdutos = page.totalElements;
        this.itemsPerPage = page.size;
      },
      error: (erro) => {
        this.openModal('Ocorreu um erro, favor contatar o dev');
        return [];
      },
    });
  }

  openModal(message: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
  }

  handlePageChange(event: number): void {
    this.paginaAtual = event;
    this.getListProdutos();
  }
}
