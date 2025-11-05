import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
  ModalTitleDirective,
  ButtonDirective,
  ButtonCloseDirective,
  ModalModule
} from '@coreui/angular';

@Component({
  selector: 'app-create-product-components',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalTitleDirective,
    ButtonDirective,
    ButtonCloseDirective,
    ModalModule
  ],
  templateUrl: './create-product-components.component.html',
})
export class CreateProductComponentsComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tanggalInput: ['', Validators.required],
      namaProduk: ['', Validators.required],
      kodeProduk: ['', Validators.required],
      kategori: ['', Validators.required],
      hargaBeli: ['', Validators.required],
      hargaJual: ['', Validators.required],
      stok: ['', Validators.required],
      minimalStok: ['', Validators.required],
      status: ['Tersedia', Validators.required],
    });
  }

  onClose() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('✅ Data Produk:', this.form.value);
      this.onClose();
    }
  }
}
