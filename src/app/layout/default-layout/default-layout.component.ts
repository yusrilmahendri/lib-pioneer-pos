import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';

import { IconDirective } from '@coreui/icons-angular';
import { IconSetService } from '@coreui/icons-angular';
import { 
  cilSpeedometer, 
  cilHistory, 
  cilWallet, 
  cilLayers,
  cilTags,
  // Ikon Header (Baru)
  cilMenu,
  cilUser,
  cilSettings,
  cilAccountLogout,
  cilSun,
  cilMoon,
  cilContrast
} from '@coreui/icons';

import {
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
} from '@coreui/angular';

import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { navItems } from './_nav';

function isOverflown(element: HTMLElement) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    IconDirective,
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective
  ]
})
export class DefaultLayoutComponent {
  public navItems = [...navItems];
    public iconSetService = inject(IconSetService);
  constructor() {
    // Daftarkan semua ikon yang Anda gunakan di _nav.ts
    this.iconSetService.icons = {
      cilSpeedometer,
      cilHistory,
      cilWallet,
      cilLayers,
      cilTags,
      // Header
      cilMenu,
      cilUser,
      cilSettings,
      cilAccountLogout,
      cilSun,
      cilMoon,
      cilContrast
    };
  }
}
