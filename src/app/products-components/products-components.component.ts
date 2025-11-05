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
import { cilPencil, cilTrash, cilPlus , cilPrint, cilSearch } from '@coreui/icons'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { CreateProductComponentsComponent } from './create-product-components/create-product-components.component';
import Swal from 'sweetalert2';

interface IProduct {
  id: number;
  namaProduk: string;
  kodeProduk: string;
  kategori: string;
  hargaBeli: number;
  hargaJual: number;
  stok: number;
  minimalStok: number;
  tanggalInput: string;
  status: 'Tersedia' | 'Habis' | 'Stok Menipis';
}

@Component({
  selector: 'app-products-components',
  imports: [ButtonModule,ReactiveFormsModule,
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
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    ModalBodyComponent,
    CreateProductComponentsComponent
  ],
  standalone: true,
  templateUrl: './products-components.component.html',
  styleUrl: './products-components.component.scss',
})

export class ProductsComponentsComponent {
  public products: IProduct[] = [];
  public icons = { cilPencil, cilTrash, cilPlus, cilPrint, cilSearch };
  public visibleCreateProduct = false;
  selectedProduct: any = null;
  deletedMessage = ''; // untuk notifikasi
  showToast = false; // toggle toast
  visibleDeleteModal = false;

  constructor() { }

  ngOnInit(): void {
    this.doInitTabel();

  }

    doInitTabel(){
      this.products = [
        { id: 1, namaProduk: 'Ayam Krispi Original', kodeProduk: 'PK-001', kategori: 'Makanan', hargaBeli: 10000, hargaJual: 15000, stok: 50, minimalStok: 10, tanggalInput: '2025-10-01', status: 'Tersedia'},
        { id: 2, namaProduk: 'Paket Ayam Saus Madu', kodeProduk: 'PK-002', kategori: 'Makanan', hargaBeli: 18000, hargaJual: 25000, stok: 30, minimalStok: 10, tanggalInput: '2025-10-01', status: 'Tersedia' },
        { id: 3, namaProduk: 'Kentang Goreng Reguler', kodeProduk: 'SN-001', kategori: 'Camilan', hargaBeli: 8000, hargaJual: 12000, stok: 100, minimalStok: 20, tanggalInput: '2025-10-02', status: 'Tersedia' },
        { id: 4, namaProduk: 'Minuman Soda (Kaleng)', kodeProduk: 'BV-001', kategori: 'Minuman', hargaBeli: 5000, hargaJual: 7000, stok: 0, minimalStok: 10, tanggalInput: '2025-10-02', status: 'Habis' },
        { id: 5, namaProduk: 'Es Teh Manis', kodeProduk: 'BV-002', kategori: 'Minuman', hargaBeli: 2000, hargaJual: 5000, stok: 8, minimalStok: 10, tanggalInput: '2025-10-03', status: 'Stok Menipis' },
      ];
    }

    formatRupiah(amount: number): string {
      return 'Rp ' + amount.toLocaleString('id-ID');
    }

    getStatusColor(status: 'Tersedia' | 'Habis' | 'Stok Menipis'): string {
      if (status === 'Tersedia') return 'success';
      if (status === 'Habis') return 'danger';
      return 'warning'; // Untuk 'Stok Menipis'
    }

    openEditProductModal(product?: any) {
      this.selectedProduct = product; // mode edit
      this.visibleCreateProduct = true;
    }

    openCreateProductModal() {
      this.selectedProduct = null;
      this.visibleCreateProduct = true;
    }

openDeleteProductModal(product: IProduct) {
  Swal.fire({
    title: `Hapus produk "${product.namaProduk}"?`,
    text: "Data produk akan dihapus permanen!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  }).then((result) => {
    if (result.isConfirmed) {
      // hapus produk dari array
      this.products = this.products.filter(p => p.id !== product.id);

      // notifikasi berhasil
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: `Produk "${product.namaProduk}" berhasil dihapus!`,
        timer: 2000,
        showConfirmButton: false
      });
    }
  });
}
}
