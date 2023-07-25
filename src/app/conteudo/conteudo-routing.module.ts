import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ULancamentosComponent } from './u-lancamentos/u-lancamentos.component';

const routes: Routes = [
  {
    path: '',
    component: ULancamentosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConteudoRoutingModule { }
