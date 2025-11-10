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
import { NgStyle, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlDirective, FormDirective, FormLabelDirective } from '@coreui/angular';
import { WidgetsComponent } from '../views/widgets/widgets/widgets.component';
import { RouterLink } from '@angular/router';

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
import { cilCalendar, cilPencil, cilPlus, cilPrint, cilSearch, cilTrash, cilYen } from '@coreui/icons';

@Component({
  selector: 'app-transaction-components',
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
    WidgetsComponent,
    RouterLink,
  ],
  standalone: true,
  templateUrl: './transaction-components.component.html',
  styleUrl: './transaction-components.component.scss',
})
export class TransactionComponentsComponent {

  kasirName = 'Ahmad Budi Utomo';
  transactionDate = '22/10/2025';
  branchName = 'Chickroll Yogyakarta';

  selectedDate: string = '';
  public visibleCreatePengeluaran = false;
  public penjualans: IPenjualan[] = [];
  public icons = { cilPencil, 
    cilTrash, 
    cilPlus, 
    cilPrint, 
    cilSearch, 
    cilYen,
    cilCalendar
  };

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
