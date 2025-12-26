import { Component, inject, OnDestroy } from '@angular/core';
import { ProdutoService } from '../service/produto.service';
import { Produto } from 'src/app/conteudo/model/produto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalComponent } from 'src/app/shared/componentes/message-modal/message-modal.component';
import { Subscription } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProdutosComponent } from '../produtos/produtos.component';


@Component({
  selector: 'app-u-lancamentos',
  standalone: true,
  imports: [ProdutosComponent, NgxPaginationModule],
  templateUrl: './u-lancamentos.component.html',
  styleUrls: ['./u-lancamentos.component.css']
})
export class ULancamentosComponent implements OnDestroy {
  // Injeções modernas
  private produtoService = inject(ProdutoService);
  private modalService = inject(NgbModal);

  listProdutos: Array<Produto> = [];
  paginaAtual: number = 1;
  itemsPerPage: number = 0;
  totalProdutos: number = 0;
  
  private sub?: Subscription;

  constructor() {
    this.getListProdutos();
  }

  getListProdutos() {
    this.sub = this.produtoService.getListProdutos(this.paginaAtual - 1).subscribe({ // Ajustado para 0-based se sua API Java for padrão Spring
      next: (page) => {
        this.listProdutos = page.content;
        this.totalProdutos = page.totalElements;
        this.itemsPerPage = page.size;
      },
      error: () => this.openModal("Erro ao carregar produtos.", "Erro")
    });
  }

  handlePageChange(event: number): void {
    this.paginaAtual = event;
    this.getListProdutos();
    window.scrollTo(0, 0); // Experiência de usuário: volta ao topo ao mudar de página
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  openModal(message: string, titulo: string) {
    const modalRef = this.modalService.open(MessageModalComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.titulo = titulo;
  }
}