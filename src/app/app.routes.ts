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
import { ForgetPasswordComponent } from './authentifications-components/forget-password/forget-password.component';
import { RoleGuard } from './shared/guards/role.guard';
import { CashierComponentsComponent } from './cashier-components/cashier-components.component';
import { TransactionComponentsComponent } from './transaction-components/transaction-components.component';

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
    path: 'forgot-password',
    component: ForgetPasswordComponent,
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      // Supervisor
      { path: 'dashboard/supervisor', component: DashboardComponent, canActivate: [RoleGuard], data: { title: 'Dashboard', roles: ['supervisor'] } },
      { path: 'products/supervisor', component: ProductsComponentsComponent, canActivate: [RoleGuard], data: { title: 'Kelola Produk', roles: ['supervisor'] } },
      { path: 'penjualan/supervisor', component: PenjualanComponentsComponent, canActivate: [RoleGuard], data: { title: 'Kelola Penjualan', roles: ['supervisor'] } },
      { path: 'pengeluaran/supervisor', component: PengeluaranComponentsComponent, canActivate: [RoleGuard], data: { title: 'Kelola Pengeluaran', roles: ['supervisor'] } },
      { path: 'vouchers/supervisor', component: VouchersComponentsComponent, canActivate: [RoleGuard], data: { title: 'Kelola Voucher', roles: ['supervisor'] } },

      // Cashier
      { path: 'dashboard/cashier', component: CashierComponentsComponent, canActivate: [RoleGuard], data: { title: 'Kasir', roles: ['cashier'] } },
      { path: 'cashier/riwayat-transaksi', component: TransactionComponentsComponent, canActivate: [RoleGuard], data: { title: 'Riwayat Transaksi', roles: ['cashier'] } },

      // Owner (jika nanti dibuat)
      { path: 'dashboard/owner', component: DashboardComponent, canActivate: [RoleGuard], data: { title: 'Dashboard Owner', roles: ['owner'] } },
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

