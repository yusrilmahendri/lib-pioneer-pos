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
  selector: 'app-create-voucher',
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
    ModalModule],
  standalone: true,
  templateUrl: './create-voucher.component.html',
  styleUrl: './create-voucher.component.scss',
})
export class CreateVoucherComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  voucherForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.voucherForm = this.fb.group({
      kodePromo: ['', [Validators.required]],
      deskripsi: ['', [Validators.required]],
      tipePromo: ['', [Validators.required]],
      tanggalMulai: [null, [Validators.required]],
      tanggalSelesai: [null, [Validators.required]],
      kuotaPromo: [null, [Validators.required, Validators.min(0)]],
      status: ['aktif', [Validators.required]] // Default ke 'aktif'
    });
  }

  onClose(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onSave(): void {
    if (this.voucherForm.invalid) {
      this.voucherForm.markAllAsTouched();
      return;
    }

    // Form valid, kirim data
    console.log('Form Data:', this.voucherForm.value);
    
    // Setelah sukses menyimpan, tutup modal
    this.onClose();
  }
}
