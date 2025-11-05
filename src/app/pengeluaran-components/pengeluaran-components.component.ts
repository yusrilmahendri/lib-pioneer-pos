import { Component } from '@angular/core';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressComponent,
  TableDirective,
  BadgeComponent,
  ButtonModule,
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
  ButtonCloseDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalHeaderComponent,
  ModalTitleDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { WidgetsBrandComponent } from '../views/widgets/widgets-brand/widgets-brand.component';
import { NgStyle, CommonModule } from '@angular/common';
import { cilCalendar ,cilPencil, cilTrash, cilPlus , cilPrint, cilSearch, cilYen } from '@coreui/icons'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { WidgetsComponent } from '../views/widgets/widgets/widgets.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import  { CreatePengeluaranComponentsComponent } from './create-pengeluaran-components/create-pengeluaran-components.component';
import Swal from 'sweetalert2';

interface IPengeluaran {
  id: number;
  tanggal: string;
  kategori_pengeluaran: string;
  deskripsi: string;
  total: number;
  user: string;
  lampiran: string;
}


@Component({
  selector: 'app-pengeluaran-components',
  standalone: true,
  imports: [ ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective, 
    CommonModule, 
    BadgeComponent,
    CardComponent, 
    CardBodyComponent, 
    ColComponent, 
    ButtonDirective, 
    IconDirective, 
    ButtonGroupComponent, 
    FormCheckLabelDirective, 
    ChartjsComponent, 
    NgStyle,
    TableDirective,
    GutterDirective,
    PaginationComponent,
    PageItemDirective,
    PageLinkDirective,
    AvatarComponent,
    CardHeaderComponent,
    CardFooterComponent,
    ProgressComponent,
    WidgetsBrandComponent,
    RouterLink,
    WidgetsComponent,
    BsDatepickerModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    CreatePengeluaranComponentsComponent
  ],
  templateUrl: './pengeluaran-components.component.html',
  styleUrl: './pengeluaran-components.component.scss',
})
export class PengeluaranComponentsComponent {
  public pengeluarans: IPengeluaran[] = [];
  public icons = { cilPencil, cilTrash, cilPlus, cilPrint, cilSearch, cilYen, cilCalendar };
  selectedDate: string = '';
  public visibleCreatePengeluaran = false;
 
  constructor() { }
  
  ngOnInit(): void {  
   this.doInitTabel();
  }
  
    doInitTabel(){
      this.pengeluarans = [
        {
          id: 1,
          tanggal: '2024-01-01',
          kategori_pengeluaran: 'Makanan',
          deskripsi: 'Pembelian makanan',
          total: 150000,
          user: 'yusril',
          lampiran: 'invoice_1.pdf',
        },
        {
          id: 2,
          tanggal: '2024-01-02',
          kategori_pengeluaran: 'Transportasi',
          deskripsi: 'Pembelian tiket kereta',
          user: 'mahendri',
          lampiran: 'invoice_2.pdf',
          total: 75000,
        },
        // Tambahkan data penjualan lainnya sesuai kebutuhan
      ];    
    }

    formatRupiah(amount: number): string {
      return 'Rp ' + amount.toLocaleString('id-ID');
    }

    openCreatePengeluaranModal(){
      this.visibleCreatePengeluaran = true
    }
  
    openDeletePengeluaranModal(pengeluaran: IPengeluaran) {
      Swal.fire({
        title: `Hapus data kategori pengeluaran "${pengeluaran.kategori_pengeluaran}"?`,
        text: "Kategori data pengeluaran akan dihapus permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6'
      }).then((result) => {
        if (result.isConfirmed) {
          // hapus produk dari array
          this.pengeluarans = this.pengeluarans.filter(p => p.id !== pengeluaran.id);

          // notifikasi berhasil
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: `Kategori data pengeluaran "${pengeluaran.kategori_pengeluaran}" berhasil dihapus!`,
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
    }
  }
