import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' } // Ikon ini sudah benar
  },
  {
    name: 'Kelola Produk',
    url: '/products', // URL placeholder diperbarui
    iconComponent: { name: 'cil-layers' } 
  },
  {
    name: 'Riwayat Penjualan',
    url: '/sales/history', // URL placeholder diperbarui
    iconComponent: { name: 'cil-history' } // Menggantikan 'cil-pencil'
  },
  {
    name: 'Pengeluaran',
    url: '/expenses', // URL placeholder diperbarui
    iconComponent: { name: 'cil-wallet' } // Menggantikan 'cil-pencil'
  },
  {
    name: 'Kelola Voucher',
    url: '/vouchers', // URL placeholder diperbarui
    iconComponent: { name: 'cil-tags' } // Menggantikan 'cil-pencil'
  },
];