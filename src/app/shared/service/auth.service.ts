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

  init(): void {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
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
        this.router.navigate(['/dashboard/admin']);
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
  const token = localStorage.getItem('token');

  // Jika tidak ada token, langsung bersihkan storage
  if (!token) {
    this.cleanStorage();
    return;
  }

  const headers = {
    Authorization: `Bearer ${token}`
  };

  // Panggil API logout Laravel
  this.http.post(`${this.apiUrl}/auth/logout`, {}, { headers }).subscribe({
    next: () => {
      console.log('Token successfully removed from database');
      this.cleanStorage();
    },
    error: (err) => {
      console.warn('Logout API error, forcing local logout:', err);
      // Token expired atau invalid pun tetap hapus localStorage
      this.cleanStorage();
    }
  });
}

// Fungsi bersih-bersih localStorage
private cleanStorage(): void {
  localStorage.removeItem('user');
  localStorage.removeItem('token');

  console.log('token after remove:', localStorage.getItem('token')); // harus null

  this.router.navigate(['/login']);
}

}
