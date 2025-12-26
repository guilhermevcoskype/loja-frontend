import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  faBars,
  /* faHeart, */
  faSearch,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import {
  Subscription,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  throwError,
} from 'rxjs';
import { BuscaService } from 'src/app/conteudo/service/busca.service';
import { DadoToken } from '../../conteudo/model/dadoToken';
import { LoginService } from '../../conteudo/service/login.service';
import { ProdutoService } from 'src/app/conteudo/service/produto.service';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
    selector: 'app-cabecalho',
    standalone: true,
    imports: [FontAwesomeModule, ReactiveFormsModule, RouterLink],
    templateUrl: './cabecalho.component.html',
    styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {
  // Injeção moderna (mais limpa)
  private loginService = inject(LoginService);
  private buscaService = inject(BuscaService);
  private produtoService = inject(ProdutoService);
  private router = inject(Router);

  faBusca = faSearch;
  faBars = faBars;
  faCarrinho = faShoppingCart;
  // loginSubscription!: Subscription;
  // buscaSubscription!: Subscription;
  // produtoSubscription!: Subscription;
  

  // Signals para estado reativo
  // toSignal converte o Observable do serviço em um Signal automaticamente
  tokenDecodificado = toSignal(this.loginService.tokenDecodificado$, { initialValue: new DadoToken() });
  
  // Computed signal para verificar se está logado
  logado = computed(() => this.tokenDecodificado().sub !== '');

  tipoProdutos = signal<string[]>([]);
  isCollapsed = signal(false);
  mensagemErro = signal('');

  busca = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    // Carregar tipos de produto
    this.produtoService.buscarTiposProduto().subscribe(res => this.tipoProdutos.set(res));
    
    // Lógica de busca (mantida como observable, pois busca reativa é melhor assim)
    this.busca.valueChanges.pipe(
      filter(v => v?.length >= 3),
      debounceTime(300),
      distinctUntilChanged() // Evita buscas repetidas se o texto não mudar
    ).subscribe(valor => this.buscaService.setBusca(valor, this.router));
  }

  acaoBotaoSair() {
    this.loginService.resetToken();
    this.loginService.setTokenDecodificado(new DadoToken());
  }

    buscarTipoProduto(tipoProduto: string) {
    this.buscaService.setBuscaPorTipo(tipoProduto, this.router);
  }

  // ngOnDestroy(): void {
  //   this.buscaSubscription.unsubscribe();
  //   this.produtoSubscription.unsubscribe();
  //   this.loginSubscription.unsubscribe();
  // }

  public carregarTela(tela: string) {
    this.router.navigate(['/conteudo/' + tela]);
  }
}