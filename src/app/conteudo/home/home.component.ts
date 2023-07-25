import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { catchError } from 'rxjs';
import { ProdutoService } from '../service/produto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from 'src/app/shared/componentes/message-modal/message-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  listProdutos: Array<Produto> = [];


  constructor(private readonly produtoService: ProdutoService,
    private modalService: NgbModal,) {
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
      .subscribe((listProdutos) => {
        this.listProdutos = listProdutos
      });
  }

  openModal(message: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
  }
}
