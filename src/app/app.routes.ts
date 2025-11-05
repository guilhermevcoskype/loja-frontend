import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'conteudo',
  },
  {
    path: 'conteudo',
    loadChildren: () =>
      import('./conteudo/conteudo.routes').then((m) => m.CONTEUDO_ROUTES),
  }
];