import { Component, inject } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  ContainerComponent,
  RowComponent
} from '@coreui/angular';

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
  // private auth = inject(Auth);
  private router = inject(Router);

  form!: FormGroup;

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
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required],
      agree: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });  
  }

  // ✅ Logic submit form register
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      return;
    }

    const data = this.form.value;
  }
}
