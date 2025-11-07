import { Component, inject  } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  ContainerComponent,
  RowComponent
} from '@coreui/angular';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login-components',
  imports: [
    RouterLink, 
    FormsModule, 
    CommonModule, 
    ReactiveFormsModule, 
    ContainerComponent,
    RowComponent
  ],
  standalone: true,
  templateUrl: './login-components.component.html',
  styleUrl: './login-components.component.scss',
})
export class LoginComponentsComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router); // ✅ tambahkan baris ini!

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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

    const { email, password } = this.form.value;
    const success = this.auth.login(email, password);

    if (success) {
      const user = this.auth.getCurrentUser();

      if (user?.role === 'owner') this.router.navigate(['/dashboard/owner']);
      else if (user?.role === 'cashier') this.router.navigate(['/dashboard/cashier']);
      else if (user?.role === 'supervisor') this.router.navigate(['/dashboard/supervisor']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login gagal',
        text: 'Email atau password salah!',
      });
    }
  }

}
