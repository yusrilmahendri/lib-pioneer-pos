import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    { id: 1, email: 'o@mail.com', password: '123456', role: 'owner', name: 'Owner User' },
    { id: 2, email: 'c@mail.com', password: '123456', role: 'cashier', name: 'Cashier User' },
    { id: 3, email: 's@mail.com', password: '123456', role: 'supervisor', name: 'Supervisor User' },
  ];

  private currentUser: User | null = null;

  constructor(private router: Router) {
    // ✅ Saat pertama kali app diload (setelah refresh)
    // Ambil user dari localStorage agar tetap login
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);

    if (user) {
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      this.redirectByRole(user.role);
      return true;
    }

    return false;
  }

  private redirectByRole(role: string): void {
    switch (role) {
      case 'owner':
        this.router.navigate(['/dashboard/owner']);
        break;
      case 'cashier':
        this.router.navigate(['/cashier']);
        break;
      case 'supervisor':
        this.router.navigate(['/dashboard/supervisor']);
        break;
      default:
        this.router.navigate(['/dashboard']);
        break;
    }
  }

  getCurrentUser(): User | null {
    // ✅ Jika currentUser belum ada (misal setelah refresh), ambil dari localStorage
    if (!this.currentUser) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    }
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  init(): Promise<void> {
    return new Promise((resolve) => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
      resolve();
    });
  }


  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
