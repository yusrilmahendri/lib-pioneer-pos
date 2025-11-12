import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    await this.authService.init();

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    // ✅ Use account_role from API
    const allowedRoles = route.data['roles'] as string[];
    if (allowedRoles && !allowedRoles.includes(user.account_role)) {
      this.router.navigate(['/404']); // optional: redirect unauthorized users
      return false;
    }

    return true;
  }
}
