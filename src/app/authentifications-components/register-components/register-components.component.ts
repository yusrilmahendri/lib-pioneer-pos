import { Component, inject } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  ContainerComponent,
  RowComponent
} from '@coreui/angular';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register-components',
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ContainerComponent,
    RowComponent,
  ],
  templateUrl: './register-components.component.html',
  styleUrl: './register-components.component.scss',
})
export class RegisterComponentsComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);

  form!: FormGroup;
  isLoading = false;
  errorMessage = '';

  ngOnInit(): void {
    this.doGetForm();
  }

  get f() {
    return this.form.controls;
  }

  // ✅ Validasi password
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('password_confirmation')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  doGetForm(){
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
      phone: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  // ✅ Logic submit form register
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

    this.showLoading('Mendaftarkan akun...');

    const data = this.form.value;

    this.http.post(`${environment.apiUrl}/auth/register`, data).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.closeLoading();
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Akun berhasil didaftarkan. Silakan login.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },

      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.closeLoading();
        let errorMessage = 'Server error occurred.';
        if (err.status === 422) {
          this.errorMessage = 'Validasi gagal. Periksa input Anda.';
        } else if (err.status === 409) {
          this.errorMessage = 'Email sudah terdaftar.';
        } else {
          this.errorMessage = 'Terjadi kesalahan server.';
        }
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: this.errorMessage,
          confirmButtonText: 'OK'
        });
      }
    });
  }

  private showLoading(message: string) {
    Swal.fire({
      title: message,
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });
  }

  private closeLoading() {
    Swal.close();
  }
}
