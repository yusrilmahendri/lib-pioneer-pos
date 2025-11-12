import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.authService.init(); // cukup panggil biasa

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data['roles'] as string[];
    if (allowedRoles && !allowedRoles.includes(user.account_role)) {
      this.router.navigate(['/404']);
      return false;
    }

    return true;
  }
}
