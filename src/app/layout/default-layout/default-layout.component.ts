import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { getNavItems } from './_nav';
import { AuthService } from '../../shared/service/auth.service';
import { IconSetService } from '@coreui/icons-angular';
import {
  SidebarComponent,
  SidebarNavComponent,
  ContainerComponent,
  SidebarBrandComponent,
  SidebarHeaderComponent,
  SidebarFooterComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
} from '@coreui/angular';
import {
  cilSpeedometer,
  cilHistory,
  cilWallet,
  cilLayers,
  cilTags,
  cilMenu,
  cilUser,
  cilSettings,
  cilAccountLogout,
  cilSun,
  cilMoon,
  cilContrast,
  cilCart
} from '@coreui/icons';
import { DefaultFooterComponent, DefaultHeaderComponent } from './';
import { ShadowOnScrollDirective } from '@coreui/angular';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-default-layout',
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
    NgScrollbar,
    RouterOutlet,
    RouterLink,
    ShadowOnScrollDirective
  ],
  standalone: true,
})
export class DefaultLayoutComponent implements OnInit {

  private auth = inject(AuthService);
  public iconSetService = inject(IconSetService);
  public navItems: INavData[] = []; 


  constructor() {
    this.iconSetService.icons = {
      cilSpeedometer,
      cilHistory,
      cilWallet,
      cilLayers,
      cilTags,
      cilMenu,
      cilUser,
      cilSettings,
      cilAccountLogout,
      cilSun,
      cilMoon,
      cilContrast,
      cilCart
    };
  }

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();
    const role = user?.role || 'guest';
    this.navItems = getNavItems(role);
  }

}
