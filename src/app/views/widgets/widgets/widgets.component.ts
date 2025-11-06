import { Component, AfterContentInit, ChangeDetectorRef, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  RowComponent,
  ColComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  CardGroupComponent,
  ProgressComponent,
  WidgetStatBComponent,
  WidgetStatCComponent,
  WidgetStatFComponent,
  TemplateIdDirective
} from '@coreui/angular';
import { WidgetsBrandComponent } from '../widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets-dropdown/widgets-dropdown.component';
import { WidgetsEComponent } from '../widgets-e/widgets-e.component';
import { CommonModule } from '@angular/common';
import { cilMoney, cilCreditCard, cilGraph, cilCart } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-widgets',
  styleUrls: ['./widgets.component.scss'],
  standalone: true, 
  templateUrl: './widgets.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    CommonModule,
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardGroupComponent,
    ProgressComponent,
    WidgetStatBComponent,
    WidgetStatCComponent,
    WidgetStatFComponent,
    WidgetsBrandComponent,
    WidgetsDropdownComponent,
    WidgetsEComponent,
    IconDirective,
    TemplateIdDirective,
  ]
})
export class WidgetsComponent implements AfterContentInit {
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  public icons = {
    cilCart,
    cilMoney,
    cilCreditCard,
    cilGraph
  };

  currentUrl = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url)
    ),
    { initialValue: this.router.url }
  );

  activeRouteName = computed(() => {
    const url = this.currentUrl().split('?')[0];
    const segments = url.split('/').filter(Boolean);
    return segments[segments.length - 1] || '';
  });

  ngAfterContentInit() {
    this.cdr.detectChanges();
  }
}
