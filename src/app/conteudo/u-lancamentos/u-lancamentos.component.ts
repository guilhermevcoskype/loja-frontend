import { Component } from '@angular/core';
import { Observable, catchError } from 'rxjs';
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

  constructor(private readonly produtoService: ProdutoService, private modalService: NgbModal) {
    this.getListProdutos();
  }

  getListProdutos() {
    return this.produtoService
      .getListProdutos()
      .pipe(
        catchError((message) => {
          this.openModal("Ocorreu um erro, favor contatar o dev");
          return [];
        })
      )
      .subscribe(listProdutos => {
        this.listProdutos = listProdutos
      });
  }

  openModal(message: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
  }
}
