import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ULancamentosComponent } from './u-lancamentos/u-lancamentos.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'produtos',
  },
  {
    path: 'produtos',
    loadChildren: () =>
      import('./conteudo/conteudo.module').then((m) => m.ConteudoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConteudoRoutingModule { }
