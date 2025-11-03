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
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { WidgetsBrandComponent } from '../views/widgets/widgets-brand/widgets-brand.component';
import { NgStyle, CommonModule } from '@angular/common';
import { cilPencil, cilTrash, cilPlus , cilPrint, cilSearch, cilYen } from '@coreui/icons'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { WidgetsComponent } from '../views/widgets/widgets/widgets.component';

interface IPengeluaran {
  id: number;
  tanggal: string;
  kategori_pengeluaran: string;
  deskripsi: string;
  total: number;
  user: number;
  lampiran: string;
}


@Component({
  selector: 'app-pengeluaran-components',
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
    WidgetsComponent
  ],
  templateUrl: './pengeluaran-components.component.html',
  styleUrl: './pengeluaran-components.component.scss',
})
export class PengeluaranComponentsComponent {
  public pengeluarans: IPengeluaran[] = [];
  public icons = { cilPencil, cilTrash, cilPlus, cilPrint, cilSearch, cilYen };
  
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
          user: 1,
          lampiran: 'invoice_1.pdf',
        },
        {
          id: 2,
          tanggal: '2024-01-02',
          kategori_pengeluaran: 'Transportasi',
          deskripsi: 'Pembelian tiket kereta',
          user: 2,
          lampiran: 'invoice_2.pdf',
          total: 75000,
        },
        // Tambahkan data penjualan lainnya sesuai kebutuhan
      ];    
    }
  
    formatRupiah(amount: number): string {
      return 'Rp ' + amount.toLocaleString('id-ID');
    }
}
