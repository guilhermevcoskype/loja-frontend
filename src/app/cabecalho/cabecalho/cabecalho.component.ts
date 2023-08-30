import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faBars,
  /* faHeart, */
  faSearch,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import {
  catchError,
  debounceTime,
  filter,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { BuscaService } from 'src/app/conteudo/service/busca.service';
import { DadoToken } from '../../conteudo/model/dadoToken';
import { LoginService } from '../../conteudo/service/login.service';
import { ProdutoService } from 'src/app/conteudo/service/produto.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent implements OnInit {
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
    this.loginService.tokenDecodificado$.subscribe((token) => {
      this.tokenDecodificado = token;
      if (token.sub != '') {
        this.logado = true;
      } else {
        this.logado = false;
      }
    });
    this.fazerBusca$.subscribe();
    this.produtoService.buscarTiposProduto().subscribe(
      {
        next: resultado => {this.tipoProdutos = resultado},
        error: erro => console.log(erro)
      }
    );
  }

  public carregarTela(tela: string) {
    this.router.navigate(['/conteudo/' + tela]);
  }

  acaoBotaoSair() {
    this.loginService.resetToken();
    this.loginService.setTokenDecodificado(new DadoToken());
  }

  buscarTipoProduto(tipoProduto: string){
    this.buscaService.setBuscaPorTipo(tipoProduto, this.router);
  }

}
