import { Component, inject } from '@angular/core';
import { CarrinhoItem } from '../model/carrinhoItem';
import { CarrinhoService } from '../service/carrinho.service';
import { MessageModalComponent } from 'src/app/shared/componentes/message-modal/message-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PagamentoService } from '../service/pagamento.service';
import { LoginService } from '../service/login.service';
import { CurrencyPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus, faTrash, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CurrencyPipe, FontAwesomeModule, RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent {
  // Injeções
  protected carrinhoService = inject(CarrinhoService);
  private modalService = inject(NgbModal);
  private pagamentoService = inject(PagamentoService);
  private loginService = inject(LoginService);

  // Ícones
  faPlus = faPlus;
  faMinus = faMinus;
  faTrash = faTrash;
  faCartShopping = faCartShopping;

  // Atalhos para os Signals do Service (facilita o uso no HTML)
  itens = this.carrinhoService.itens;
  totalQuantidade = this.carrinhoService.quantidadeTotal;
  totalPreco = this.carrinhoService.precoTotal;

  aumentar(item: any) {
    this.carrinhoService.aumentarQuantidadeItem(item);
  }

  diminuir(item: any) {
    this.carrinhoService.diminuirQuantidadeItem(item);
  }

  remover(item: any) {
    this.carrinhoService.removerItem(item);
  }

finalizar() {
    // ... lógica de verificação de login ...

    if (this.itens().length > 0) {
      this.pagamentoService.pagarCompra(this.totalPreco()).subscribe({
        next: (res) => {
          this.openModal("Pagamento concluído com sucesso!", "Sucesso");
          this.carrinhoService.limparCarrinho(); // Zera o carrinho após a compra
        },
        error: () => this.openModal("Erro no pagamento. Tente mais tarde.", "Erro")
      });
    }
  }

  openModal(message: string, titulo: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.titulo = titulo;
  }
}