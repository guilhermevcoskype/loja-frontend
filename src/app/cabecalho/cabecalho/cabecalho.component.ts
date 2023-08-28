import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBars,
  faHeart,
  faSearch,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
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
  busca!: string;
  tokenDecodificado!: DadoToken;
  public isCollapsed = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private buscaService: BuscaService
  ) {}

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
    console.log(this.loginService.getToken());
  }

  public carregarTela(tela: string) {
    this.router.navigate(['/conteudo/' + tela]);
  }

  acaoBotaoSair() {
    this.loginService.resetToken();
    this.loginService.setNome(new DadoToken());
  }

  realizarBusca(busca: string) {
    // this.router.navigate(['/conteudo/buscaProduto'], { state: { busca } });
    this.buscaService.setBusca(this.busca, this.router);
  }
}
