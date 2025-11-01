import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { Page404Component } from './views/pages/page404/page404.component';
import { LoginComponent } from './views/pages/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProductsComponentsComponent } from './products-components/products-components.component';
import { PenjualanComponentsComponent } from './penjualan-components/penjualan-components.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
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
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  // Tangkap semua rute lain dan arahkan ke 404
  { path: '**', redirectTo: '404' }
];

