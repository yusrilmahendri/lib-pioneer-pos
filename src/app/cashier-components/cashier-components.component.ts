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

@Component({
  selector: 'app-cashier-components',
  imports: [
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
      ],
  standalone: true,
  templateUrl: './cashier-components.component.html',
  styleUrl: './cashier-components.component.scss',
})
export class CashierComponentsComponent {

}
