import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    // ✅ Pastikan user dari localStorage sudah dimuat
    await this.authService.init();

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    // ✅ Periksa role yang diizinkan
    const allowedRoles = route.data['roles'] as string[];
    console.log('User role:', user.role);
    console.log('Allowed roles for this route:', allowedRoles);
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
