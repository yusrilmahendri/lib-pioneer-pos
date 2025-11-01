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
  RowComponent,
  TableDirective,
  BadgeComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { WidgetsBrandComponent } from '../views/widgets/widgets-brand/widgets-brand.component';
import { NgStyle } from '@angular/common';

interface IProduct {
  id: number;
  nama: string;
  kategori: string;
  harga: number;
  stok: number;
  status: 'Tersedia' | 'Habis';
}

@Component({
  selector: 'app-products-components',
  imports: [BadgeComponent, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent],
  standalone: true,
  templateUrl: './products-components.component.html',
  styleUrl: './products-components.component.scss',
})
export class ProductsComponentsComponent {
  // Data dummy untuk tabel produk
  public products: IProduct[] = [];

  constructor() { }

  ngOnInit(): void {
    this.doInitTabel();
  }

  doInitTabel(){
    this.products = [
      { id: 101, nama: 'Ayam Krispi Original', kategori: 'Makanan', harga: 15000, stok: 50, status: 'Tersedia' },
      { id: 102, nama: 'Paket Ayam Saus Madu', kategori: 'Makanan', harga: 25000, stok: 30, status: 'Tersedia' },
      { id: 103, nama: 'Kentang Goreng Reguler', kategori: 'Camilan', harga: 12000, stok: 100, status: 'Tersedia' },
      { id: 104, nama: 'Minuman Soda (Kaleng)', kategori: 'Minuman', harga: 7000, stok: 0, status: 'Habis' },
      { id: 105, nama: 'Es Teh Manis', kategori: 'Minuman', harga: 5000, stok: 200, status: 'Tersedia' },
    ];
  }

  // Fungsi untuk format Rupiah (bisa dipindahkan ke service nanti)
  formatRupiah(amount: number): string {
    return 'Rp ' + amount.toLocaleString('id-ID');
  }

  // Fungsi untuk mendapatkan warna badge berdasarkan status
  getStatusColor(status: 'Tersedia' | 'Habis'): string {
    return status === 'Tersedia' ? 'success' : 'danger';
  }
}
