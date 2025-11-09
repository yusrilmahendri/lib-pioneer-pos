// src/app/layout/default-layout/_nav.ts
import { INavData } from '@coreui/angular';

export function getNavItems(role: string): INavData[] {
  switch (role) {
    case 'owner':
      return [
        {
          name: 'Dashboard Owner',
          url: '/dashboard/owner',
          iconComponent: { name: 'cil-speedometer' }
        },
      ];

    case 'cashier':
      return [
        {
          name: 'Kasir',
          url: '/dashboard/cashier',
          iconComponent: { name: 'cil-cart' }
        },
          {
          name: 'Riwayat Transaksi',
          url: '/cashier/riwayat-transaksi',
          iconComponent: { name: 'cil-history' }
        },
      ];
    case 'supervisor':
      return [
        {
          name: 'Dashboard',
          url: '/dashboard/supervisor',
          iconComponent: { name: 'cil-speedometer' } // Ikon ini sudah benar
        },
        {
          name: 'Kelola Produk',
          url: '/products/supervisor', // URL placeholder diperbarui
          iconComponent: { name: 'cil-layers' } 
        },
        {
          name: 'Riwayat Penjualan',
          url: '/penjualan/supervisor', // URL placeholder diperbarui
          iconComponent: { name: 'cil-history' } // Menggantikan 'cil-pencil'
        },
        {
          name: 'Pengeluaran',
          url: '/pengeluaran/supervisor', // URL placeholder diperbarui
          iconComponent: { name: 'cil-wallet' } // Menggantikan 'cil-pencil'
        },
        {
          name: 'Kelola Voucher',
          url: '/vouchers/supervisor', // URL placeholder diperbarui
          iconComponent: { name: 'cil-tags' } // Menggantikan 'cil-pencil'
        },
      ];

    default:
      return [
        {
          name: 'login',
          url: '',
        }
      ];
  }
}
