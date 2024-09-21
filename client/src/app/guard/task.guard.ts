import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const taskGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    router.navigate(['/tasks']);
    return false;
  }
  return true;
};
