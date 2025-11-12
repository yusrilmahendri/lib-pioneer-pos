import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContainerComponent, RowComponent } from '@coreui/angular';
import Swal from 'sweetalert2';
import { AuthService } from '../../shared/service/auth.service'; // ✅ make sure this path is correct

@Component({
  selector: 'app-login-components',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ContainerComponent,
    RowComponent
  ],
  templateUrl: './login-components.component.html',
  styleUrl: './login-components.component.scss',
})
export class LoginComponentsComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      username_or_email: ['', [Validators.required]], // ✅ bisa email atau username
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username_or_email, password } = this.form.value;

    // ✅ now handle Observable login
    this.auth.login(username_or_email, password).subscribe({
      next: (response) => {
        const user = this.auth.getCurrentUser();

        if (user?.account_role === 'owner') this.router.navigate(['/dashboard/owner']);
        else if (user?.account_role === 'cashier') this.router.navigate(['/dashboard/cashier']);
        else if (user?.account_role === 'admin') this.router.navigate(['/dashboard/supervisor']);
        else this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Login gagal',
          text: 'Email/username atau password salah!',
        });
      },
    });
  }
}
