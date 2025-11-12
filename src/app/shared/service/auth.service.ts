import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../model/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  init(): Promise<void> {
    return new Promise((resolve) => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) this.currentUser = JSON.parse(savedUser);
      resolve();
    });
  }

  // ✅ Login dengan atribut username_or_email
  login(identifier: string, password: string): Observable<any> {
    if (!identifier || !password) {
      throw new Error('Username/email dan password wajib diisi!');
    }

    const payload = {
      username_or_email: identifier,
      password,
    };

    return this.http.post<any>(`${this.apiUrl}/auth/login`, payload).pipe(
      tap((response) => {
        const user = response?.data?.user;
        const token = response?.data?.token;

        if (user && token) {
          this.currentUser = user;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);

          // ✅ gunakan account_role dari response API
          this.redirectByRole(user.account_role);
        } else {
          console.error('Struktur response API tidak sesuai:', response);
        }
      })
    );
  }

  private redirectByRole(role: string): void {
    switch (role) {
      case 'owner':
        this.router.navigate(['/dashboard/owner']);
        break;
      case 'cashier':
        this.router.navigate(['/dashboard/cashier']);
        break;
      case 'admin':
        this.router.navigate(['/dashboard/supervisor']);
        break;
      default:
        this.router.navigate(['/dashboard']);
        break;
    }
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const savedUser = localStorage.getItem('user');
      if (savedUser) this.currentUser = JSON.parse(savedUser);
    }
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
