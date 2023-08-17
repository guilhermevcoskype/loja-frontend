import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ULancamentosComponent } from './u-lancamentos/u-lancamentos.component';
import { LoginComponent } from './login/login.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'uLancamentos',
  },
  {
    path: 'uLancamentos',
    component: ULancamentosComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'cadastroUsuario',
    component: CadastroUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConteudoRoutingModule { }
