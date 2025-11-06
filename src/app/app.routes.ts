import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { Page404Component } from './views/pages/page404/page404.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProductsComponentsComponent } from './products-components/products-components.component';
import { PenjualanComponentsComponent } from './penjualan-components/penjualan-components.component';
import { PengeluaranComponentsComponent } from './pengeluaran-components/pengeluaran-components.component';
import { VouchersComponentsComponent } from './vouchers-components/vouchers-components.component';
import { LoginComponentsComponent } from './authentifications-components/login-components/login-components.component';
import { RegisterComponentsComponent } from './authentifications-components/register-components/register-components.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponentsComponent,
  },
  {
    path: 'register',
    component: RegisterComponentsComponent,
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Dashboard'
    },
    children: [
        { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
        { path: 'products', component: ProductsComponentsComponent, data: { title: 'Kelola Produk' } },
        { path: 'penjualan', component: PenjualanComponentsComponent, data: { title: 'Kelola Penjualan' } },
        { path: 'pengeluaran', component: PengeluaranComponentsComponent, data: { title: 'Kelola Pengeluaran' } },
        { path: 'vouchers', component: VouchersComponentsComponent, data: { title: 'Kelola Voucher' } }
    ]
  },
  // Rute-rute ini ditampilkan DI LUAR layout
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },

  // Tangkap semua rute lain dan arahkan ke 404
  { path: '**', redirectTo: '404' }
];

