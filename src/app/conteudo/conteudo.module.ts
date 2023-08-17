import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ConteudoRoutingModule } from './conteudo-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ULancamentosComponent } from './u-lancamentos/u-lancamentos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';


@NgModule({
  declarations: [
    ULancamentosComponent,
    ProdutosComponent,
    HomeComponent,
    LoginComponent,
    CadastroUsuarioComponent
  ],
  imports: [
    CommonModule,
    ConteudoRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ConteudoModule { }
