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
import { cilPencil, cilTrash, cilPlus , cilPrint, cilSearch, cilYen, cilCalendar } from '@coreui/icons'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { WidgetsComponent } from '../views/widgets/widgets/widgets.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalDetailComponentsComponent } from '../shared/modal-detail-components/modal-detail-components.component';

interface IPenjualan {
  id: number;
  no_transaksi: string;
  tanggal_input: string;
  kasir: string;
  item: number;
  total: number;
  metode_pembayaran: ['Tunai' | 'Non Tunai' | 'Gopay' | 'OVO' | 'Dana' | 'QRIS'];
  status: 'Lunas' | 'Belum Lunas';
}

@Component({
  selector: 'app-penjualan-components',
  imports: [ 
    ButtonModule,
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
    ButtonCloseDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalDetailComponentsComponent
  ],
  standalone: true,
  templateUrl: './penjualan-components.component.html',
  styleUrl: './penjualan-components.component.scss',
})
export class PenjualanComponentsComponent {

public penjualans: IPenjualan[] = [];
public icons = { cilPencil, 
  cilTrash, 
  cilPlus, 
  cilPrint, 
  cilSearch, 
  cilYen,
  cilCalendar
};
selectedDate: string = '';
public visibleCreatePengeluaran = false;

constructor() { }

ngOnInit(): void {  
 this.doInitTabel();
}

  doInitTabel(){
    this.penjualans = [
      {
        id: 1,
        no_transaksi: 'TRX001',
        tanggal_input: '2024-01-01',
        kasir: 'John Doe',
        item: 3,
        total: 150000,
        metode_pembayaran: ['Tunai'],
        status: 'Lunas',
      },
      {
        id: 2,
        no_transaksi: 'TRX002',
        tanggal_input: '2024-01-02',
        kasir: 'Jane Smith',
        item: 5,
        total: 250000,
        metode_pembayaran: ['Non Tunai'],
        status: 'Belum Lunas',
      },
      // Tambahkan data penjualan lainnya sesuai kebutuhan
    ];    
  }

  formatRupiah(amount: number): string {
    return 'Rp ' + amount.toLocaleString('id-ID');
  }

  getStatusColor(status: 'Lunas' | 'Belum Lunas'): string {
    if (status === 'Lunas') return 'success';
    return 'danger'; // Untuk 'Belum Lunas'
  }

  onDetailPenjualan(){
      this.visibleCreatePengeluaran = true
  }
}
