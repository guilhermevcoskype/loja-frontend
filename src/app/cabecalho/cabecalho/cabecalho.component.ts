import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  faBars,
  /* faHeart, */
  faSearch,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { BuscaService } from 'src/app/conteudo/service/busca.service';
import { DadoToken } from '../../conteudo/model/dadoToken';
import { LoginService } from '../../conteudo/service/login.service';
import { ProdutoService } from 'src/app/conteudo/service/produto.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-cabecalho',
    imports: [FontAwesomeModule, ReactiveFormsModule, RouterLink, NgbDropdownModule],
    templateUrl: './cabecalho.component.html',
    styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent  {
  // Injeção moderna (mais limpa)
  private loginService = inject(LoginService);
  private buscaService = inject(BuscaService);
  private produtoService = inject(ProdutoService);
  private router = inject(Router);

  faBusca = faSearch;
  faBars = faBars;
  faCarrinho = faShoppingCart;

  usuario = this.loginService.usuario; 
  logado = this.loginService.estaLogado; 
  isAdmin = this.loginService.isAdmin;
  

  // Signals para estado reativo
  // toSignal converte o Observable do serviço em um Signal automaticamente
  // tokenDecodificado = toSignal(this.loginService.tokenDecodificado$, { initialValue: new DadoToken() });
  
  // Computed signal para verificar se está logado
  // logado = computed(() => this.tokenDecodificado().sub !== '');

  tipoProdutos = signal<string[]>([]);
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
    ).subscribe(valor => this.buscaService.setBusca(valor));
  }

  acaoBotaoSair() {
    this.loginService.logout(); // Use o método de logout que limpa os signals
    this.router.navigate(['/conteudo/login']);
  }

    buscarTipoProduto(tipoProduto: string) {
    this.buscaService.setBuscaPorTipo(tipoProduto);
  }

  public carregarTela(tela: string) {
    this.router.navigate(['/conteudo/' + tela]);
  }
}