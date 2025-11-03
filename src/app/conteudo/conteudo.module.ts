import { CommonModule,CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';


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
import { CurrencyMaskModule } from 'ng2-currency-mask';


@NgModule({
    imports: [
    CommonModule,
    ConteudoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    CurrencyMaskModule,
    ULancamentosComponent,
    ProdutosComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    CadastroProdutoComponent,
    BuscaProdutoComponent,
    CarrinhoComponent
],
    providers: [CurrencyPipe]
})
export class ConteudoModule { }
