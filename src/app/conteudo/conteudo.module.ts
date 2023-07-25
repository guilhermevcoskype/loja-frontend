import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ConteudoRoutingModule } from './conteudo-routing.module';
import { ProdutosComponent } from './produtos/produtos.component';
import { ULancamentosComponent } from './u-lancamentos/u-lancamentos.component';
import { HomeComponent } from './home/home.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';


@NgModule({
  declarations: [
    ULancamentosComponent,
    ProdutosComponent,
    HomeComponent,
    CabecalhoComponent
  ],
  imports: [
    CommonModule,
    ConteudoRoutingModule,
    SharedModule
  ]
})
export class ConteudoModule { }
