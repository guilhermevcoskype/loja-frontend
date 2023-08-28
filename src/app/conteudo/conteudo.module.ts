import { CommonModule,CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ConteudoRoutingModule } from './conteudo-routing.module';
import { LoginComponent } from './login/login.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ULancamentosComponent } from './u-lancamentos/u-lancamentos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { BuscaProdutoComponent } from './busca-produto/busca-produto.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarrinhoComponent } from './carrinho/carrinho.component';


@NgModule({
  declarations: [
    ULancamentosComponent,
    ProdutosComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    CadastroProdutoComponent,
    BuscaProdutoComponent,
    CarrinhoComponent
  ],
  imports: [
    CommonModule,
    ConteudoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [CurrencyPipe]
})
export class ConteudoModule { }
