import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
  ModalTitleDirective,
  ButtonDirective,
  ButtonCloseDirective
} from '@coreui/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '@coreui/angular-pro';

@Component({
  selector: 'app-create-pengeluaran-components',
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
    ModalTitleDirective,
    DatePickerComponent
  ],
  templateUrl: './create-pengeluaran-components.component.html',
  styleUrls: ['./create-pengeluaran-components.component.scss'],
})
export class CreatePengeluaranComponentsComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  pengeluaranForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pengeluaranForm = this.fb.group({
      tanggal: [null, [Validators.required]],
      kategori: ['', [Validators.required]],
      deskripsi: ['', [Validators.required]],
      nominal: ['', [Validators.required, Validators.min(0)]],
      lampiran: [null]
    });
  }

  onClose(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onSave(): void {
    if (this.pengeluaranForm.invalid) {
      this.pengeluaranForm.markAllAsTouched();
      return;
    }

    // Form valid, kirim data
    console.log('Form Data:', this.pengeluaranForm.value);
    
    // Setelah sukses menyimpan, tutup modal
    this.onClose();
  }
}
