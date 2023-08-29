import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faBars,
  faHeart,
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

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent implements OnInit {
  faBusca = faSearch;
  faBarras = faBars;
  faCoracao = faHeart;
  faCarrinho = faShoppingCart;
  logado: boolean = false;
  nomeLogado!: string;
  busca = new FormControl();
  tokenDecodificado!: DadoToken;
  mensagemErro = '';
  public isCollapsed = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private buscaService: BuscaService
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
    this.loginService.nome.subscribe((token) => {
      this.tokenDecodificado = token;
      if (token.sub != '') {
        this.logado = true;
        this.nomeLogado = token.sub;
      } else {
        this.logado = false;
      }
    });
    this.fazerBusca$.subscribe();
  }

  public carregarTela(tela: string) {
    this.router.navigate(['/conteudo/' + tela]);
  }

  acaoBotaoSair() {
    this.loginService.resetToken();
    this.loginService.setNome(new DadoToken());
  }
}
