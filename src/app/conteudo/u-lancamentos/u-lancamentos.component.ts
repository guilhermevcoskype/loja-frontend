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

}
