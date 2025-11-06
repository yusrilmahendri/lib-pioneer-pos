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
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { WidgetsBrandComponent } from '../views/widgets/widgets-brand/widgets-brand.component';
import { NgStyle, CommonModule } from '@angular/common';
import { cilPencil, cilTrash, cilPlus , cilPrint, cilSearch } from '@coreui/icons'; 
import { FormsModule } from '@angular/forms';
import { FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { CreateVoucherComponent } from './create-voucher/create-voucher.component';
import Swal from 'sweetalert2';

interface IVoucher {
  id: number;
  tanggalInput: string;
  kodePromo: string;
  deskripsi: string;
  tipePromo: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  koutaPromo: number;
  namaProduk: string;
  status: 'Aktif' | 'Kadaluarsa' | 'Selesai';
}

@Component({
  selector: 'app-vouchers-components',
  imports: [ FormsModule,
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
    CardFooterComponent, 
    GutterDirective, 
    ProgressComponent, 
    WidgetsBrandComponent, 
    CardHeaderComponent, 
    TableDirective, 
    AvatarComponent
    ,PaginationComponent, 
    PageItemDirective, 
    PageLinkDirective, 
    RouterLink,
    CreateVoucherComponent,
  ],
  standalone: true,
  templateUrl: './vouchers-components.component.html',
  styleUrl: './vouchers-components.component.scss',
})
export class VouchersComponentsComponent {
  public vouchers: IVoucher[] = [];
  public icons = { cilPencil, cilTrash, cilPlus, cilPrint, cilSearch };
  public visibleCreateVoucher = false;
  selectedVoucher: any = null;
  deletedMessage = ''; // untuk notifikasi
  showToast = false; // toggle toast
  visibleDeleteModal = false;
  
  constructor() { }

  ngOnInit(): void {
    this.doInitTabel();

  }

  doInitTabel(){
    this.vouchers = [
      {
        id: 1,
        tanggalInput: '2024-01-10',
        kodePromo: 'PROMO50',
        deskripsi: 'Diskon 50% untuk semua produk',
        tipePromo: 'Diskon',
        tanggalMulai: '2024-01-15',
        tanggalSelesai: '2024-01-31',
        koutaPromo: 100,
        namaProduk: 'Produk A',
        status: 'Aktif'
      },
      {
        id: 2,
        tanggalInput: '2024-02-05',
        kodePromo: 'BUY1GET1',
        deskripsi: 'Beli 1 gratis 1 untuk produk tertentu',
        tipePromo: 'Buy One Get One',
        tanggalMulai: '2024-02-10',
        tanggalSelesai: '2024-02-20',
        koutaPromo: 50,
        namaProduk: 'Produk B',
        status: 'Selesai'
      },
    ];
  }

  getStatusColor(status: 'Aktif' | 'Kadaluarsa' | 'Selesai'): string {
    if (status === 'Aktif') return 'success';
    if (status === 'Selesai') return 'danger';
    return 'warning'; // Untuk 'Kadaluarsa'
  }

  onCreateVoucher(){
    this.visibleCreateVoucher = true;
  }

  openEditVoucherModal(voucher?: any) {
   this.selectedVoucher = voucher; // mode edit
   this.visibleCreateVoucher = true;
  }

    openDeletePengeluarantModal(voucher: IVoucher) {
      Swal.fire({
        title: `Hapus voucher dengan kode promo "${voucher.kodePromo}"?`,
        text: "Data voucher akan dihapus permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6'
      }).then((result) => {
        if (result.isConfirmed) {
          // hapus produk dari array
          this.vouchers = this.vouchers.filter(p => p.id !== voucher.id);
  
          // notifikasi berhasil
          Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: `Voucher dengan kode "${voucher.kodePromo}" berhasil dihapus!`,
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
    }
}
