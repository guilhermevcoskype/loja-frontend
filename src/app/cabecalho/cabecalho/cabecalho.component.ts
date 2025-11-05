import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
    selector: 'app-cabecalho',
    templateUrl: './cabecalho.component.html',
    styleUrls: ['./cabecalho.component.css'],
    standalone: true,
    imports: [
        RouterLink,
        ReactiveFormsModule,
        FontAwesomeModule,
        NgIf,
        NgClass,
        NgFor,
    ],
})
export class CabecalhoComponent implements OnInit, OnDestroy {
  faBusca = faSearch;
  faBarras = faBars;
  // faCoracao = faHeart;
  faCarrinho = faShoppingCart;
  logado: boolean = false;
  nomeLogado!: string;
  busca = new FormControl();
  tokenDecodificado!: DadoToken;
  mensagemErro = '';
  public isCollapsed = false;
  tipoProdutos: string[] = [];
  loginSubscription!: Subscription;
  buscaSubscription!: Subscription;
  produtoSubscription!: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private buscaService: BuscaService,
    private produtoService: ProdutoService
  ) {}

  fazerBusca$ = this.busca.valueChanges.pipe(
    filter((valorDigitado) => valorDigitado.length >= 3),
    debounceTime(300),
    switchMap((valorDigitado) => {
      this.buscaService.setBusca(valorDigitado, this.router);
      return valorDigitado;
    }),
    catchError((erro) => {
      console.log(erro);
      return throwError(
        () =>
          new Error(
            (this.mensagemErro =
              'Ops, ocorreu um erro. Recarregue a aplicação!')
          )
      );
    })
  );

  ngOnInit(): void {
    this.loginSubscription = this.loginService.tokenDecodificado$.subscribe((token) => {
      this.tokenDecodificado = token;
      if (token.sub != '') {
        this.logado = true;
      } else {
        this.logado = false;
      }
    });
    this.buscaSubscription = this.fazerBusca$.subscribe();
    this.produtoSubscription = this.produtoService.buscarTiposProduto().subscribe({
      next: (resultado) => {
        this.tipoProdutos = resultado;
      },
      error: (erro) => console.log(erro),
    });
  }

  ngOnDestroy(): void {
    this.buscaSubscription.unsubscribe();
    this.produtoSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }

  public carregarTela(tela: string) {
    this.router.navigate(['/conteudo/' + tela]);
  }

  acaoBotaoSair() {
    this.loginService.resetToken();
    this.loginService.setTokenDecodificado(new DadoToken());
  }

  buscarTipoProduto(tipoProduto: string) {
    this.buscaService.setBuscaPorTipo(tipoProduto, this.router);
  }
}
