import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  ContainerComponent,
  RowComponent
} from '@coreui/angular';
import Swal from 'sweetalert2';

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
  // private auth = inject(Auth);
  private router = inject(Router);

  form!: FormGroup;

  ngOnInit(): void {
    // ✅ Inisialisasi form dilakukan di lifecycle hook
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

    const data = this.form.value;
    this.router.navigate(['/dashboard']);
  }
}
