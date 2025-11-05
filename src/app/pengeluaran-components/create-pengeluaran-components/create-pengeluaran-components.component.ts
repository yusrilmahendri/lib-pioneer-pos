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
    ModalTitleDirective
  ],
  templateUrl: './create-pengeluaran-components.component.html',
  styleUrls: ['./create-pengeluaran-components.component.scss'],
})
export class CreatePengeluaranComponentsComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  pengeluaranForm: FormGroup;

  // Tambahkan property pengeluaran
  pengeluaran = {
    noPengeluaran: 'TRX-2025-001', // FIX: Matched image
    tanggal: new Date('2025-10-28T14:30:00'), // FIX: Matched image
    kasir: 'Ahmad Budi Utomo',
    status: 'Lunas',
    items: [
      // FIX: Adjusted price/subtotal to match image
      { nama: 'Aqua 500ml', kode: 'BRG-0B1', qty: 1, harga: 15000, subtotal: 5000 }, 
      { nama: 'Chickroll big one', kode: 'BRG-0C02', qty: 1, harga: 45000, subtotal: 45000 },
    ],
    // FIX: Adjusted to match image
    subtotal: 50000, 
    ppn: 1100,
    // FIX: Adjusted to match image
    total: 51100, 
    metode: 'Tunai',
    // FIX: ADDED THE MISSING 'bayar' PROPERTY
    bayar: 55000, 
    kembalian: 4900
  };

  constructor(private fb: FormBuilder) {
    this.pengeluaranForm = this.fb.group({
      tanggal: [this.pengeluaran.tanggal],
      kategori: [''],
      deskripsi: [''],
      total: [0]
    });
  }

  onClose() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  onPrint() {
    window.print();
  }
}
