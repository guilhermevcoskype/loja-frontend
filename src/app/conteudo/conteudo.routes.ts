import { Routes } from "@angular/router";
import { ULancamentosComponent } from "./u-lancamentos/u-lancamentos.component";
import { BuscaProdutoComponent } from "./busca-produto/busca-produto.component";
import { CadastroProdutoComponent } from "./cadastro-produto/cadastro-produto.component";
import { CadastroUsuarioComponent } from "./cadastro-usuario/cadastro-usuario.component";
import { CarrinhoComponent } from "./carrinho/carrinho.component";
import { LoginComponent } from "./login/login.component";

export const CONTEUDO_ROUTES: Routes = [
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
  },
  {
    path: 'cadastroProduto',
    component: CadastroProdutoComponent
  },
  {
    path: 'buscaProduto',
    component: BuscaProdutoComponent
  },
  {
    path: 'carrinho',
    component: CarrinhoComponent
  }
];