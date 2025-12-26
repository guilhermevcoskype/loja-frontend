import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LoginService } from '../conteudo/service/login.service';

export const adminGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isAdmin()) {
    return true;
  }

  // Se não for admin, manda para login ou home
  router.navigate(['/conteudo/login']);
  return false;
};