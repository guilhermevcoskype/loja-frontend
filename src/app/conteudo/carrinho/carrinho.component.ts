import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarrinhoItem } from '../model/carrinhoItem';
import { CarrinhoService } from '../service/carrinho.service';
import { MessageModalComponent } from 'src/app/shared/componentes/message-modal/message-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagamentoService } from '../service/pagamento.service';
import { LoginService } from '../service/login.service';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-carrinho',
    templateUrl: './carrinho.component.html',
    styleUrls: ['./carrinho.component.css'],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        CurrencyPipe,
    ],
})
export class CarrinhoComponent implements OnInit, OnDestroy {
  carrinho: CarrinhoService;
  mapItensKeys!: CarrinhoItem[];

  constructor(
    private carrinhoService: CarrinhoService,
    private modalService: NgbModal,
    private pagamentoService: PagamentoService,
    private loginService: LoginService
  ) {
    this.carrinho = carrinhoService;
    this.mapItensKeys = this.carrinho.carrinhoItens;
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {}

  aumentarQuantidadeItem(item: CarrinhoItem) {
    this.carrinho.aumentarQuantidadeItem(item);
    this.mapItensKeys = this.carrinho.carrinhoItens;
  }

  diminuirQuantidadeItem(item: CarrinhoItem) {
    this.carrinho.getQuantidadeItem(item)! > 1
      ? this.carrinho.diminuirQuantidadeItem(item)
      : this.carrinho.removerItem(item);
    this.mapItensKeys = this.carrinho.carrinhoItens;
  }

  removerItem(item: CarrinhoItem) {
    this.carrinho.removerItem(item);
    this.mapItensKeys = this.carrinho.carrinhoItens;
  }

  finalizar() {
    if (this.loginService.getToken()) {
      if (this.mapItensKeys.length > 0) {
        this.pagamentoService
          .pagarCompra(this.carrinho.getPrecoTotal())
          .subscribe({
            next: (resposta) => {
              this.openModal(resposta, "Pagamento");
              this.carrinho.carrinhoItens = [];
              this.mapItensKeys = this.carrinho.carrinhoItens;
            },
            error: (erro) => {
              console.log(erro);
              this.openModal(
                "Houve um erro no pagamento, favor tentar mais tarde.", "Erro"
              );
            },
          });
      } else {
        this.openModal("Ocorreu um erro, favor contatar o dev", "Erro");
      }
    }else{
      this.openModal("Você precisa estar logado para finalizar a compra.", "Erro");
    }
  }

  openModal(message: string, titulo: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.titulo = titulo;
  }
}
