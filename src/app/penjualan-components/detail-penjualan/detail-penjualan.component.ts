import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import {
  ModalComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalFooterComponent,
  ModalTitleDirective,
  ButtonDirective,
  ButtonCloseDirective
} from '@coreui/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import html2pdf from 'html2pdf.js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-penjualan',
  imports: [    
    CommonModule,
    ReactiveFormsModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    ButtonCloseDirective,
    ModalTitleDirective
  ],
  standalone: true,
  templateUrl: './detail-penjualan.component.html',
  styleUrl: './detail-penjualan.component.scss',
})
export class DetailPenjualanComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @ViewChild('printArea') printArea!: ElementRef;


  pengeluaranForm: FormGroup;
  showPrint = false;
  

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
      this.showPrint = true;
      Swal.fire({
        title: 'Sedang mencetak...',
        text: 'Harap tunggu sebentar',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

      setTimeout(() => {
        const element = this.printArea.nativeElement;

        const opt: any = {
          margin: 0.2,
          filename: `${this.pengeluaran.noPengeluaran}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'cm', format: [10, 23], orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save()
          .then(() => {
            this.showPrint = false;
            Swal.fire({
              icon: 'success',
              title: 'Berhasil!',
              text: 'Transaksi berhasil dicetak.',
              timer: 1500,
              showConfirmButton: false
            });
          })
          .catch(() => {
            this.showPrint = false;
            Swal.fire({
              icon: 'error',
              title: 'Gagal!',
              text: 'Terjadi kesalahan saat mencetak.'
            });
          });
      }, 500);
    }

}