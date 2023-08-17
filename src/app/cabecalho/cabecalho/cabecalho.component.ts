import { Component, OnInit } from '@angular/core';
import {
  faSearch,
  faBars,
  faHeart,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LoginService } from '../../conteudo/service/login.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { DadoToken } from '../../conteudo/model/dadoToken';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  nomeLogado: string = '';
  busca: string = '';
  public isCollapsed = false;

  constructor(private router: Router, private loginService: LoginService, private jwtHelper: JwtHelperService) {}

  ngOnInit(): void {
    this.loginService.nome.subscribe((nome) => {
      this.nomeLogado = nome;
      if (this.nomeLogado != '') this.logado = true
      else this.logado = false;
    });
    console.log(this.loginService.getToken());
    // const token = this.jwtHelper.decodeToken(this.loginService.getToken().token);
  }

  public carregarTela(tela: string) {
    this.router.navigate(['/conteudo/' + tela]);
  }

  acaoBotaoSair() {
    this.loginService.resetToken();
    this.loginService.setNome('');
  }

  realizarBusca(busca: string) {
    // buscarNoBD
    console.log('Digitou:' + busca);
  }

}
